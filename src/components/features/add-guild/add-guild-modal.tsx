"use client"

import { cn } from "@/lib/tailwind"
import { style } from "@/style"
// import CreateGuildForm fro../../forms/create-serverver"
// import JoinGuildForm from "./form-join-server"
import { User } from "@prisma/client"
import { CloseModalButton, ModalBase, useModal } from "@/components/base/modal"
import { Description, Title } from "@/components/base/dialog"
import { createSlidingWindow } from "../../api/create-sliding-window"
import { useState } from "react"
import { Button, Fieldset, Form, Input, Label } from "../../base/form"
import { AvatarPicker } from "../../base/avatar-picker"
import { useSession } from "@/lib/auth/next-auth.client"
import { useRouter } from "next/navigation"
import { useGuilds } from "@/app/app/query"
import { useZodForm } from "../../api/create-form"
import * as z from "zod"
import { generateSlug } from "random-word-slugs"
import { uploadAsWebp } from "@/actions/uploads/client-upload-webp"
import { toast } from "sonner"
import { runServer } from "@/lib/serveraction/return"
import { s_createGuild, s_joinGuild } from "@/actions/crud-guild"


const {
  windowStates,
  useSlidingWindowContainer,
  SlidingWindowProvider,
  SlidingPage,
} = createSlidingWindow(500, "index", "create", "join")




// Add Guild Dialog

export function AddGuildDialog(
  props: {
    trigger?: React.ReactNode
    children?: React.ReactNode
    user: User
  }
) {
  const [open, setOpen] = useState(false)
  const { goTo, goBack, resetState, parentContainerRef, states } = useSlidingWindowContainer()
  const backToIndex = () => goBack("index")
  const goToCreate = () => goTo("create")
  const goToJoin = () => goTo("join")

  return (
    <ModalBase
      trigger={props.children ?? props.trigger}
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
          <JoinGuildForm onBack={backToIndex} />
        </SlidingPage>

      </SlidingWindowProvider>
    </ModalBase >
  )
}



// Create Guild Form

function CreateGuildForm(
  props: {
    onBack?: () => void
    onFinish?: () => void
  }
) {
  const session = useSession()
  const router = useRouter()
  const guilds = useGuilds()
  const modal = useModal()

  const form = useZodForm({
    schema: {
      guildName: z.string().min(1).max(64),
      guildPicture: z.instanceof(Blob).optional()
    },
    defaultValues: { guildName: generateSlug(2, { format: "title" }) },
    async onSubmit(data) {
      const guild = await requestCreateGuild(session.getUserId(), data.guildName, data.guildPicture)
      if (data.guildPicture) {
        await uploadAsWebp(data.guildPicture, `guild/${ guild.id }.webp`)
      }
      guilds.addGuild(guild)
      router.push(`/app/guild/${ guild.id }`)
      modal.close()
    },
    async onError(error) {
      console.error(error)
      toast(error.message ?? "Unknown Error Occurred")
    }
  })

  async function requestCreateGuild(userId: string, guildName: string, guildPicture: Blob | undefined) {
    return await runServer(s_createGuild, { userId, guildName, withGuildPicture: !!guildPicture })
  }

  return (
    <Form {...form}>
      <section className="flex flex-col p-4 items-stretch">
        <Fieldset name="guildPicture" className="flex flex-col items-stretch self-center">
          <AvatarPicker />
        </Fieldset>
        <Fieldset name="guildName" className="mt-4 flex flex-col items-stretch">
          <Label>Guild Name</Label>
          <Input />
        </Fieldset>
      </section>
      <footer className={cn(style.dialogFooter)}>
        <button className={cn(style.dialogButton)} type="button" onClick={props.onBack}>Back</button>
        <Button className={cn(style.dialogButton, "mt-0")}>Create</Button>
      </footer>
    </Form>
  )
}




// Join Guild Form

function JoinGuildForm(
  props: {
    onBack?: () => void
    onFinish?: () => void
  }
) {
  const session = useSession()
  const router = useRouter()
  const guilds = useGuilds()
  const modal = useModal()

  const form = useZodForm({
    schema: {
      invite: z.string().length(8),
    },
    mode: "onSubmit",
    async onSubmit(data) {
      const { guild, fail } = await requestJoinGuild(session.getUserId(), data.invite)
      if (fail === "notfound") {
        toast("Not Found")
        form.setError("invite", {
          message: "Invite key not found!",
          type: "serverError"
        })
        return
      }
      if (fail === "alreadymember") {
        toast("Already a member")
        form.setError("invite", {
          message: `You already joined this server (${guild.name})`,
          type: "alternate",
        })
        return
      }
      guilds.addGuild(guild)
      router.push(`/app/guild/${ guild.id }`)
      modal.close()
    },
    async onError(error) {
      console.error(error)
      toast(error.message ?? "Unknown Error Occurred")
    }
  })

  async function requestJoinGuild(userId: string, inviteKey: string) {
    return await runServer(s_joinGuild, { userId, inviteKey })
  }

  return (
    <Form {...form}>
      <section className="flex flex-col p-4 items-stretch">
        <Fieldset name="invite" className="mt-4 flex flex-col items-stretch">
          <Label disableError>Invite Link</Label>
          <Input placeholder='hTKzmaks' autoCorrect="off" />

          <div className="h-4 text-[0.8rem] mt-2 italic">
            {
              form.formState.errors.invite && form.formState.errors.invite?.type !== 'alternate' && <span className="text-red-400">↪ {form.formState.errors.invite?.message}</span>
            }
            {
              form.formState.errors.invite?.type === 'alternate' &&  <span className="text-green-400">↪ {form.formState.errors.invite?.message}</span>
            }
          </div>

        </Fieldset>
      </section>
      <footer className={cn(style.dialogFooter)}>
        <button className={cn(style.dialogButton)} type="button" onClick={props.onBack}>Back</button>
        <Button className={cn(style.dialogButton, "mt-0")} ignoreFormError>Join Guild</Button>
      </footer>
    </Form>
  )
}
