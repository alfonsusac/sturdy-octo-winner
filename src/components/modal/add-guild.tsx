"use client"

import { cn } from "@/lib/tailwind"
import { style } from "@/style"
import CreateGuildForm from "../forms/create-server"
import JoinGuildForm from "../forms/join-server"
import { User } from "@prisma/client"
import { CloseModalButton, ModalBase } from "@/components/base/modal"
import { Description, Title } from "@/components/base/dialog"
import { createSlidingWindow, useSlidingWindow } from "../api/create-sliding-window"
import { useState } from "react"
import { Button } from "../base/form"


const {
  windowStates,
  useSlidingWindowContainer,
  SlidingWindowProvider,
  SlidingPage,
} = createSlidingWindow(500, "index", "create", "join")
export { windowStates as AddGuildModalWindowStates }



export function AddGuildDialog(p: {
  trigger?: React.ReactNode
  children?: React.ReactNode
  user: User
}) {

  const [open, setOpen] = useState(false)
  const { goTo, goBack, resetState, parentContainerRef, states } = useSlidingWindowContainer()

  const backToIndex = () => goBack("index")
  const goToCreate = () => goTo("create")
  const goToJoin = () => goTo("join")


  return (
    <ModalBase
      trigger={p.children ?? p.trigger}
      onOpenChange={open => {
        open && resetState()
        setOpen(open)
      }}
      className={{ content: "flex flex-col transition-all focus:outline-none duration-200" }}
      contentRef={parentContainerRef}
      open={open}
    >
      <CloseModalButton />
      <SlidingWindowProvider states={states}>
        <SlidingPage state="index">
          <div>
            <div className="text-center p-4">
              <Title>Add a New Server</Title>
              <Description>Your server is where you and your firends hand out. Make yours and start talking.</Description>
            </div>
            <div className={cn(style.dialogFooter, "grid grid-cols-2")}>
              <button onClick={goToJoin} className={cn(style.dialogButton, "h-16")} >
                <small className="text-indigo-300/60 leading-[0.6]">
                  Have an invite? <br />
                </small>
                Join Server
              </button>
              <button onClick={goToCreate} className={cn(style.dialogButton, "h-16")}>
                Create My Own
              </button>
            </div>
          </div>
        </SlidingPage>

        <SlidingPage state="create" prev="index">
          <header className="text-center p-4 pb-0 flex flex-col items-center">
            <Title>Create a New Server</Title>
            <Description>Give your new server a personality with a name and an icon. You can always change it later.</Description>
          </header>
          <CreateGuildForm onBack={backToIndex} />
        </SlidingPage>

        <SlidingPage state="join" prev="index">
          <header className="text-center p-4 pb-0 flex flex-col items-center">
            <Title>Join a Server</Title>
            <Description>Enter an invite below to join an existing server</Description>
          </header>
          <JoinGuildForm toBack={backToIndex} />
        </SlidingPage>

      </SlidingWindowProvider>
    </ModalBase >
  )
}
