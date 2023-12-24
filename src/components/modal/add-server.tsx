"use client"

import { cn } from "@/lib/tailwind"
import { style } from "@/style"
import { ComponentProps, MutableRefObject, ReactNode, Ref, SVGProps, createContext, useCallback, useContext, useEffect, useId, useRef, useState } from "react"
import CreateServerForm, { CreateServerFormSubmitHandler } from "../../app/app/_form/create-server"
import JoinServerForm from "../../app/app/_form/join-server"
import { User } from "@prisma/client"
import { CloseModalButton, ModalBase } from "@/components/base/modal"
import { Description, Title } from "@/components/base/dialog"
import { createReactContext } from "../lib/context"


function createSlidingWindow<S extends Readonly<string[]>>(duration: number, ...states: S) {
  type T = S[number]
  function useSlidingWindowContainer() {
    const [state, setState] = useState<T>(states[0] as T)
    const [leftSide, setLeftSide] = useState<T>()
    const [rightSide, setRightSide] = useState<T>()
    const [animationState, setAnimationState] = useState<"left" | "right" | undefined>(undefined)
    let setParentHeightRef = useRef<(height: number) => void>()

    const parentContainerRef = useCallback((node: HTMLDivElement) => {
      if (node === null) return
      // On parent container mount, 

      // set current height as style heigh (if its empty)
      if (node.style.height === "") node.style.height = node.clientHeight + "px"

      // set the parent setter to a ref variable (to be distributed to child context and used in child)
      setParentHeightRef.current = (height) => node.style.height = `${height}px`
    }, [])

    const goTo = (dest: T) => {
      setState(dest)
      setLeftSide(state) // curr to left
      setRightSide(dest) // new from right
      setAnimationState("right")
    }

    const goBack = (dest: T) => {
      setState(dest)
      setLeftSide(dest) // new form left
      setRightSide(state) // curr to right
      setAnimationState("left")
    }

    useEffect(() => {
      if (animationState !== undefined) {
        setTimeout(() => {
          setAnimationState(undefined)
          setLeftSide(undefined)
          setRightSide(undefined)
        }, duration)
      }
    }, [animationState])

    const resetState = () => {
      setState(states[0] as T)
    }

    return {
      states: {
        state,
        leftSide,
        rightSide,
        animationState,
        setParentHeightRef
      },
      goTo,
      goBack,
      resetState,
      parentContainerRef,
    }
  }

  type contextType = ReturnType<typeof useSlidingWindowContainer>['states']

  const [
    slidingWindowContainer,
    useSlidingWindow
  ] = createReactContext<contextType | undefined>(undefined)

  function SlidingWindowProvider({ children, states }: { children: ReactNode, states: contextType }) {
    return <slidingWindowContainer.Provider value={ states }>
      <div className={ cn(
        "relative w-full items-center",
        "transition-none", // important
        states.animationState && cn(
          "transition-transform duration-500 w-[200%] grid grid-cols-2 pointer-events-none",
          states.animationState === "right" && cn(
            "-translate-x-1/2" // Start from left most to mid
          ),
          states.animationState === "left" && cn(
            "-left-full translate-x-1/2" // Start from mid (not left most) to left most
          )
        ),
      ) }>
        { children }
      </div>
    </slidingWindowContainer.Provider>
  }

  function SlidingModalPage({ state, className, ...props }: ComponentProps<"div"> & { state: T }) {

    const { state: currentWindowState, leftSide, rightSide, setParentHeightRef } = useSlidingWindow()!
    const show = currentWindowState === state
    enum pos { left = "left", right = "right" }
    const position = leftSide === state ? pos.left : rightSide === state ? pos.right : undefined
    const pageId = useId()

    // This section delays when finished is turned to true
    const [hidden, setHidden] = useState(!show)
    //                                    ^ if its already showing, 
    //                                      dont hide.
    useEffect(() => {
      // If received instruction to hide but currently showing, then delay the hiding 
      if (!show && !hidden)
        setTimeout(() => {
          setHidden(true) // Hide it after animationDuration
        }, duration)

      // If received instruciton to show, then immediately un-hide it.
      if (show) setHidden(false)
    }, [show, hidden])


    const ref = useCallback((node: HTMLDivElement) => {
      if (node !== null) {
        // When child page is mounted,
        // - set the parent container to the size of the child.
        setParentHeightRef.current?.(node.clientHeight)
      }
    }, [setParentHeightRef])

    return (
      !hidden && <div id={ pageId } data-state-id={ state } ref={ ref }
        className={ cn( className, "transition-all duration-500",
          // Swaps the grid placement to be the correct order
          position === pos.left && "col-start-1 col-end-1 row-start-1 row-end-1",
          position === pos.right && "col-start-2 col-end-2 row-start-1 row-end-1",
        ) } { ...props } />
    )
  }

  return {
    useSlidingWindowContainer,
    useSlidingWindow,
    SlidingWindowProvider,
    SlidingModalPage,
  }

}


const {
  useSlidingWindowContainer,
  SlidingWindowProvider,
  SlidingModalPage,
} = createSlidingWindow(500, "index", "create", "join")

export function AddServerDialog(p: {
  children?: React.ReactNode
  user: User
}) {

  const { goTo, goBack, resetState, parentContainerRef, states } = useSlidingWindowContainer()

  return (
    <ModalBase onChange={ open => open && resetState() } trigger={ p.children }
      className={ { content: "flex flex-col transition-all focus:outline-none duration-200" } }
      contentRef={ parentContainerRef }
    >
      <div className="">
        <SlidingWindowProvider states={ states }>
          
          <SlidingModalPage state="index">
            <div>
              <div className="text-center p-4">
                <Title>Add a New Server</Title>
                <Description>Your server is where you and your firends hand out. Make yours and start talking.</Description>
              </div>
              <div className={ cn(style.dialogFooter, "grid grid-cols-2") }>
                <button onClick={ () => goTo("join") } className={ cn(style.dialogButton, "h-16") } >
                  <small className="text-indigo-300/60 leading-[0.6]">
                    Have an invite? <br />
                  </small>
                  Join Server
                </button>
                <button onClick={ () => goTo("create") } className={ cn(style.dialogButton, "h-16") }>
                  Create My Own
                </button>
              </div>
            </div>
          </SlidingModalPage>

          <SlidingModalPage state="create">
            <header className="text-center p-4 pb-0 flex flex-col items-center">
              <Title>Create a New Server</Title>
              <Description>Give your new server a personality with a name and an icon. You can always change it later.</Description>
            </header>
            <CreateServerForm toBack={ () => goBack("index") } user={ p.user }/>
          </SlidingModalPage>

          <SlidingModalPage state="join">
            <header className="text-center p-4 pb-0 flex flex-col items-center">
              <Title>Join a Server</Title>
              <Description>Enter an invite below to join an existing server</Description>
            </header>
            <JoinServerForm toBack={ () => goBack("index") } />
          </SlidingModalPage>


        </SlidingWindowProvider>
        <CloseModalButton />
      </div>
    </ModalBase >
  )
}
