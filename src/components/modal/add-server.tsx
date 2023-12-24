"use client"

import { cn } from "@/lib/tailwind"
import { style } from "@/style"
import { ComponentProps, MutableRefObject, ReactNode, Ref, SVGProps, createContext, useCallback, useContext, useEffect, useId, useRef, useState } from "react"
import CreateServerForm, { CreateServerFormSubmitHandler } from "../../app/app/_form/create-server"
import JoinServerForm from "../../app/app/_form/join-server"
import { User } from "@prisma/client"
import { CloseModalButton, ModalBase } from "@/components/base/modal"
import { Description, Title } from "@/components/base/dialog"

type RefMap<T extends string[number]> = { [key in T]?: Ref<HTMLDivElement> }
type RefMapRef<T extends string[number]> = MutableRefObject<RefMap<T>>

function createSlidingWindow<S extends Readonly<string[]>>(duration: number, ...states: S) {
  type T = S[number]
  function useSlidingWindowContainer() {
    const [state, setState] = useState<T>(states[0] as T)
    const [leftSide, setLeftSide] = useState<T>()
    const [rightSide, setRightSide] = useState<T>()
    const [animationState, setAnimationState] = useState<"left" | "right" | undefined>(undefined)
    const childRefs = useRef<RefMap<S[number]>>({})

    // const parentContainerRef = useRef<HTMLDivElement>(null)
    const parentContainerRef = useCallback((node: HTMLDivElement) => {
      if (node === null) {
        // DOM node referenced by ref has been unmounted
      } else {
        // DOM node referenced by ref has changed and exists
        if (state) {
          node.style.height = '30rem'
        } else {
          node.style.height = "30rem"
        }
      }
    }, [state])

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

    return { state, leftSide, rightSide, goTo, goBack, resetState, animationState, parentContainerRef, childRefs }
  }

  const slidingWindowContainer = createContext<{
    currentState: T,
    leftSide?: T,
    rightSide?: T,
    animationState?: "left" | "right",
    childRefs: RefMapRef<T>
  } | undefined>(undefined)
  const useSlidingWindow = () => useContext(slidingWindowContainer)

  function SlidingWindowProvider(p: { children: ReactNode, currentState: T, leftSide?: T, rightSide?: T, animationState?: "left" | "right", childRefs: RefMapRef<T> }) {
    const { children, ...rest } = p
    return <slidingWindowContainer.Provider value={ rest }>
      <div className={ cn(
        "relative w-full items-center",
        "transition-none", // important
        rest.animationState && cn(
          "transition-transform duration-500 w-[200%] grid grid-cols-2 pointer-events-none",
          rest.animationState === "right" && cn(
            "-translate-x-1/2" // Start from left most to mid
          ),
          rest.animationState === "left" && cn(
            "-left-full translate-x-1/2" // Start from mid (not left most) to left most
          )
        ),
      ) }>
        { children }
      </div>
    </slidingWindowContainer.Provider>
  }

  function SlidingModalPage({ state, className, ...props }: ComponentProps<"div"> & { state: T }) {

    const { currentState, leftSide, rightSide, childRefs } = useSlidingWindow()!
    const show = currentState === state
    const position = leftSide === state ? "left" : rightSide === state ? "right" : "center"
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
    
    const ref = useRef<HTMLDivElement>(null)

    useEffect(() => {
      // To check hopefully that data-state-id only occurs once in the document
      if (childRefs.current[state]) {
        console.log("This element is already registered")
      } else {
        console.log("Registered!")
        childRefs.current[state] = ref
      }
    }, [])

    return (
      !hidden && <div
        id={ pageId }
        className={ cn(
          className,
          "transition-all",
          "duration-500",
          // Swaps the grid placement to be the correct order
          "data-[position=left]:col-start-1 col-end-1 row-start-1 row-end-1",
          "data-[position=right]:col-start-2 col-end-2 row-start-1 row-end-1",
        ) }
        data-position={ position }
        data-state-id={ state }
        { ...props } />
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

  const { goTo, goBack, state, leftSide, rightSide, resetState, animationState, parentContainerRef, childRefs } = useSlidingWindowContainer()

  return (
    <ModalBase onChange={ open => open && resetState() } trigger={ p.children }
      className={ {
        content: cn("flex flex-col transition-all focus:outline-none duration-200",
          // "overflow-visible", // uncomment this to see Behind The Scenes
          // state === "index" && "h-52",
          // state === "create" && "h-[26rem]",
          // state === "join" && "h-[16.5rem]",
        )
      } }
      contentRef={ parentContainerRef }
    >
      <div className="">
        <SlidingWindowProvider currentState={ state } leftSide={ leftSide } rightSide={ rightSide } animationState={ animationState } childRefs={ childRefs }>
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
            <CreateServerForm
              toBack={ () => goBack("index") }
              user={ p.user }
            />
          </SlidingModalPage>

          <SlidingModalPage state="join">
            <header className="text-center p-4 pb-0 flex flex-col items-center">
              <Title>Join a Server</Title>
              <Description>Enter an invite below to join an existing server</Description>
            </header>
            <JoinServerForm toBack={ () => goBack("index") } />
          </SlidingModalPage>

          <SlidingModalPage state="join">
            <div>Hello</div>
          </SlidingModalPage>

        </SlidingWindowProvider>
        <CloseModalButton />
      </div>
    </ModalBase>
  )
}
