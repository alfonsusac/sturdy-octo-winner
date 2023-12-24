"use client"

import { cn } from "@/lib/tailwind"
import { style } from "@/style"
import CreateServerForm from "../../app/app/_form/create-server"
import JoinServerForm from "../../app/app/_form/join-server"
import { User } from "@prisma/client"
import { CloseModalButton, ModalBase } from "@/components/base/modal"
import { Description, Title } from "@/components/base/dialog"
import { createSlidingWindow } from "../lib/create-sliding-window"


const {
  useSlidingWindowContainer,
  SlidingWindowProvider,
  SlidingPage,
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
      <CloseModalButton />
      <SlidingWindowProvider states={ states }>


        <SlidingPage state="index">
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
        </SlidingPage>

        <SlidingPage state="create">
          <header className="text-center p-4 pb-0 flex flex-col items-center">
            <Title>Create a New Server</Title>
            <Description>Give your new server a personality with a name and an icon. You can always change it later.</Description>
          </header>
          <CreateServerForm toBack={ () => goBack("index") } user={ p.user } />
        </SlidingPage>

        <SlidingPage state="join">
          <header className="text-center p-4 pb-0 flex flex-col items-center">
            <Title>Join a Server</Title>
            <Description>Enter an invite below to join an existing server</Description>
          </header>
          <JoinServerForm toBack={ () => goBack("index") } />
        </SlidingPage>


      </SlidingWindowProvider>
    </ModalBase >
  )
}
