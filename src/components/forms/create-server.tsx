/* eslint-disable @next/next/no-img-element */
"use client"

import { generateSlug } from "random-word-slugs"
import { cn } from "@/lib/tailwind"
import { style } from "@/style"
import { ReactNode, SVGProps } from "react"
import { Button, Fieldset, Form, Input, Label } from "../base/form"
import * as z from "zod"
import { useAvatarUpload } from "../api/use-avatar-upload"
import { s_createGuild } from "@/actions/crud-guild"
import { useSession } from "@/lib/auth/next-auth.client"
import { toast } from "sonner"
import { runServerAction } from "@/lib/serveraction/return"
import { useRouter } from "next/navigation"
import { useZodForm } from "../api/create-form"
import { uploadAsWebp } from "@/actions/uploads/client-upload-webp"
import { useGuilds } from "@/app/app/query"
import { useModal } from "../base/modal"
import { AvatarPicker } from "../base/avatar-picker"

export default function CreateGuildForm(
  props: {
    onBack?: () => void
    onFinish?: () => void
    children?: ReactNode
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
    defaultValues: {
      guildName: generateSlug(2, { format: "title" }),
    },
    async onSubmit(data) {
      try {

        const guild = await requestCreateGuild(session.getUserId(), data.guildName, data.guildPicture)
        guilds.addGuild(guild)
        router.push(`/app/guild/${ guild.id }`)
        modal.close()

      } catch (error: any) {

        console.log(error)
        toast(error.message ?? "Unknown Error Occurred")

      }
    }
  })

  return (
    <Form {...form}>
      {/* Fields */}
      <div className="flex flex-col p-4 items-stretch">
        <Fieldset name="guildPicture" className="flex flex-col items-stretch self-center">
          <AvatarPicker />
        </Fieldset>
        <Fieldset name="guildName" className="mt-4 flex flex-col items-stretch">
          <Label>Guild Name</Label>
          <Input />
        </Fieldset>
      </div>

      {/* Footer */}
      <div className={cn(style.dialogFooter)}>
        <button
          className={cn(style.dialogButton)}
          onClick={props.onBack}
          type="button"
        >
          Back
        </button>
        <Button className={cn(style.dialogButton, "mt-0")}>Create</Button>
      </div>
    </Form >
  )
}




// Callbacks

async function requestCreateGuild(
  userId: string,
  guildName: string,
  guildPicture: Blob | undefined
) {
  const guild = await runServerAction(s_createGuild, {
    userId,
    guildName,
    withGuildPicture: !!guildPicture
  })
  if (guildPicture) {
    await uploadAsWebp(guildPicture, `guild/${ guild.id }.webp`)
  }
  return guild
}