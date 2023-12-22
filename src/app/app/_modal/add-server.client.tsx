"use client"

import { cn } from "@/lib/tailwind"
import { ModalDescription, ModalTitle } from "./basecomponents"
import { style } from "@/style"
import { CloseModalButton } from "./buttons"
import { ComponentProps, SVGProps, useEffect, useState } from "react"
import CreateServerForm, { CreateServerFormSubmitHandler } from "../_form/create-server"
import JoinServerForm from "../_form/join-server"
import { User } from "@prisma/client"
import { ModalBase } from "@/components/base/modal"

export function AddServerDialog(p: {
  children?: React.ReactNode
  user: User
}) {
  enum states { index, create, join }
  const [state, setState] = useState(states.index)
  const [left, setLeft] = useState<states>()
  const [right, setRight] = useState<states>()
  const [animationState, setAnimationState] = useState<"left" | "right" | "idle">("idle")

  const goTo = (dest: number) => {
    setState(dest)
    setLeft(state) // curr to left
    setRight(dest) // new from right
    setAnimationState("right")
    console.log("to right")
  }

  const goBack = (dest: number) => {
    setState(dest)
    setLeft(dest) // new form left
    setRight(state) // curr to right
    setAnimationState("left")
    console.log("left")
  }

  useEffect(() => {
    if (animationState !== "idle") {
      setTimeout(() => {
        setAnimationState("idle")
        setLeft(undefined)
        setRight(undefined)
      }, 500)
    }
  }, [animationState])

  return (
    <ModalBase
      trigger={ p.children }
      className={ {
        content: cn(
          "flex flex-col",
          "transition-all",
          "focus:outline-none",
          "transition-all",
          "duration-200",
          state === states.index && "h-52",
          state === states.create && "h-[26rem]",
          state === states.join && "h-[16.5rem]",
        )
      } }
      onOpen={ () => { setState(states.index) } }
    >
      <div className={ cn(
        "relative w-full items-center",
        "transition-none",
        "duration-500",

        "data-[animation-state=right]:-translate-x-1/2",
        "data-[animation-state=right]:transition-transform",
        "data-[animation-state=right]:duration-500",

        "data-[animation-state=left]:-left-full",
        "data-[animation-state=left]:translate-x-1/2",
        "data-[animation-state=left]:transition-transform",
        "data-[animation-state=left]:duration-500",

        // Common to both
        "data-[animation-state=left]:w-[200%]",
        "data-[animation-state=right]:w-[200%]",
        "data-[animation-state=left]:grid grid-cols-2",
        "data-[animation-state=right]:grid grid-cols-2",
        "data-[animation-state=left]:pointer-events-none",
        "data-[animation-state=right]:pointer-events-none",
      ) }
        data-animation-state={ animationState }
        data-isidle={ animationState === "idle" }
      >
        <SlidingModalContent
          // show={true}
          show={ state === states.index }
          position={ left === states.index ? "left" : right === states.index ? "right" : "center" }
        >
          <div>
            <div className={ cn("text-center", "p-4") }>
              <ModalTitle>
                Add a New Server
              </ModalTitle>
              <ModalDescription>
                Your server is where you and your firends hand out. Make yours and start talking.
              </ModalDescription>
            </div>
            <div className={ cn(style.dialogFooter, "grid grid-cols-2") }>
              <button className={ cn(style.dialogButton, "h-16") }
                onClick={ () => goTo(states.join) }
              >
                <small className="text-indigo-300/60 leading-[0.6]">
                  Have an invite? <br />
                </small>
                Join Server
              </button>
              <button className={ cn(style.dialogButton, "h-16") }
                onClick={ () => goTo(states.create) }
              >
                Create My Own
              </button>
            </div>
          </div>
        </SlidingModalContent>

        <SlidingModalContent // show={true}
          show={ state === states.create }
          position={ left === states.create ? "left" : right === states.create ? "right" : "center" }
        >
          <div>
            <header className="text-center p-4 pb-0 flex flex-col items-center">
              <ModalTitle>Create a New Server</ModalTitle>
              <ModalDescription>Give your new server a personality with a name and an icon. You can always change it later.</ModalDescription>
            </header>
            <CreateServerForm
              toBack={ () => goBack(states.index) }
              user={ p.user }
            />
          </div>
        </SlidingModalContent>

        <SlidingModalContent // show={true}
          show={ state === states.join }
          position={ left === states.join ? "left" : right === states.join ? "right" : "center" }
        >
          <div>
            <header className="text-center p-4 pb-0 flex flex-col items-center">
              <ModalTitle>Join a Server</ModalTitle>
              <ModalDescription>Enter an invite below to join an existing server</ModalDescription>
            </header>
            <JoinServerForm toBack={ () => goBack(states.index) } />
          </div>
        </SlidingModalContent>
      </div>
      <CloseModalButton />
    </ModalBase>
  )
}

/**
 * Reusable Content Component for any steps.
 * This is just a template
 */
function SlidingModalContent(p: ComponentProps<"div"> & {
  show: boolean,
  position: "left" | "right" | "center"
}) {
  const animationDuration = 500

  // This section delays when finished is turn to true
  const [hidden, setHidden] = useState(!p.show)
  //                                    ^ if its already showing, 
  //                                      dont hide.
  useEffect(() => {
    // If received instruction to hide but currently showing, then delay the hiding 
    if (!p.show && !hidden)
      setTimeout(() => {
        setHidden(true) // Hide it after animationDuration
      }, animationDuration)

    // If received instruciton to show, then immediately un-hide it.
    if (p.show) setHidden(false)
  }, [p, hidden])

  return (
    !hidden && <div
      className={ cn(
        "transition-all",
        "duration-500",

        // Swaps the grid placement to be the correct order
        "data-[position=left]:col-start-1 col-end-1 row-start-1 row-end-1",
        "data-[position=right]:col-start-2 col-end-2 row-start-1 row-end-1",
      ) }
      data-position={ p.position }
    >
      { p.children }
    </div>
  )
}

/**
 * Content item that is Wrapped by slidingModalContent.
 */
