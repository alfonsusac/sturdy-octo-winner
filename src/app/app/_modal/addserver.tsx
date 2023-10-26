"use client"

import { cn } from "@/lib/tailwind"
import BaseModal from "./base"
import { ModalDescription, ModalTitle } from "./basecomponents"
import { style } from "@/style"
import { CloseModalButton } from "./buttons"
import { ComponentProps, SVGProps, useEffect, useState } from "react"

export function AddServerDialog(p: {
  children: React.ReactNode
}) {
  enum states {
    index,
    create,
    join
  }
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
    <BaseModal
      trigger={ p.children }
      className={ {
        content: cn(
          "flex flex-col",
          "transition-all",
          "focus:outline-none",
          "transition-all",
          "duration-500",
          state === states.index && "h-52",
          state === states.create && "h-52",
        )
      } }
    >
      <div className={ cn(
        "relative w-full items-center",
        // "outline outline-white",
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
          <Index
            toJoin={ () => goTo(states.join) }
            toCreate={ () => goTo(states.create) }
          />
        </SlidingModalContent>

        <SlidingModalContent
          // show={true}
          show={ state === states.create }
          position={ left === states.create ? "left" : right === states.create ? "right" : "center" }
        >
          <CreateServer go_back={ () => goBack(states.index) } />
        </SlidingModalContent>


      </div>

      <CloseModalButton />
    </BaseModal>
  )
}

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

function Index(p: ComponentProps<"div"> & {
  toJoin: () => void,
  toCreate: () => void,
}) {
  const { toJoin, toCreate, ...props } = p

  return (
    <div { ...props }>
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
          onClick={ () => toJoin() }
        >
          <small className="text-indigo-300/60 leading-[0.6]">
            Have an invite? <br />
          </small>
          Join Server
        </button>
        <button className={ cn(style.dialogButton, "h-16") }
          onClick={ () => toCreate() }
        >
          Create My Own
        </button>
      </div>
    </div>
  )
}

function CreateServer(p: ComponentProps<"div"> & {
  go_back: () => void
}) {
  const { go_back: goBack, ...props } = p
  return (
    <div { ...props }>
      <div className={ cn("text-center", "p-4",
        "flex flex-col items-center"
      ) }>
        <ModalTitle>
          Create a New Server
        </ModalTitle>
        <ModalDescription>
          Give your new server a personality with a name and an icon. You can always change it later.
        </ModalDescription>
        <div className={ cn(
          "mt-4",
          "w-12 h-12 ",
          "outline-dashed outline-2 outline-indigo-200/40",
          "rounded-full",
          "flex flex-row items-center justify-center",
          "text-2xl",
          "text-indigo-200/80",
        ) }>
          <FluentImageAdd20Filled />
        </div>
        <fieldset className={ cn(
          "mt-4",
          "flex flex-col items-start w-full",
        ) }>
          <label className={ cn(
            "text-xs uppercase font-semibold",
            "my-1.5",
          )}>Server Name</label>
          <input
            type="text"
          />
          <span>The name can be changed later</span>
        </fieldset>
      </div>
      <div className={ cn(style.dialogFooter) }>
        <button className={ cn(style.dialogButton) }
          onClick={ goBack }
        >
          Back
        </button>
        <button className={ cn(style.dialogButton) }>
          Create
        </button>
      </div>
    </div>
  )
}


export function FluentImageAdd20Filled(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" { ...props }><path fill="currentColor" d="M10 5.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0Zm-4-2a.5.5 0 0 0-1 0V5H3.5a.5.5 0 0 0 0 1H5v1.5a.5.5 0 0 0 1 0V6h1.5a.5.5 0 0 0 0-1H6V3.5ZM5.5 11a5.5 5.5 0 0 0 4.9-8H14a3 3 0 0 1 3 3v8c0 .65-.206 1.25-.557 1.742l-5.39-5.308a1.5 1.5 0 0 0-2.105 0l-5.39 5.308A2.986 2.986 0 0 1 3 14v-3.6c.75.384 1.6.6 2.5.6Zm7-3a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1Zm0 1a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm-8.235 7.448C4.755 16.796 5.354 17 6 17h8c.646 0 1.245-.204 1.735-.552l-5.384-5.3a.5.5 0 0 0-.702 0l-5.384 5.3Z"></path></svg>
  )
}