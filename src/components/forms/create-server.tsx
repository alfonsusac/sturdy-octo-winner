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
import { addGuildToList } from "@/app/app/client"
import { useZodForm } from "../api/create-form"
import { uploadAsWebp } from "@/actions/uploads/client-upload-webp"
import { useGuilds } from "@/app/app/query"


export default function CreateGuildForm(
  props: {
    onBack: () => void
    onFinish: () => void
    children?: ReactNode
  }
) {
  const session = useSession()
  const router = useRouter()
  const guilds = useGuilds()

  const form = useZodForm({
    schema: {
      guildName: z.string().min(1).max(64),
      guildPicture: z.instanceof(Blob).optional()
    },
    defaultValues: {
      guildName: generateSlug(2, { format: "title" }),
      guildPicture: undefined,
    },
    async onSubmit(data) {
      try {
        const guild = await runServerAction(s_createGuild, {
          userId: session.getUserId(),
          guildName: data.guildName,
          withGuildPicture: !!data.guildPicture
        })
        if (data.guildPicture) {
          await uploadAsWebp(data.guildPicture, `guild/${ guild.id }.webp`)
        }
        guilds.addGuild(guild)
        router.push(`/app/guild/${ guild.id }`)
        props.onFinish()

      } catch (error: any) {
        console.log(error)
        toast(error.message ?? "Unknown Error Occurred")
      }
    }
  })

  const { getRootProps, getInputProps, preview, isLoading } = useAvatarUpload({
    onImageSelected(_, resizedBlob) {
      form.setValue("guildPicture", resizedBlob)
    },
  })

  return (
    <Form {...form}>
      {/* Fields */}
      <div className="flex flex-col p-4 items-stretch">
        <Fieldset name="guildPicture" className="flex flex-col items-stretch">
          <button className={cn("relative w-20 h-20 mt-2 p-0 self-center rounded-full overflow-hidden text-3xl",
            "outline-dashed outline-2 outline-indigo-200/40",
            "flex flex-row items-center justify-center",
            "hover:shadow-[0px_0px_0px_8px_#717AC233]",
            preview && "outline-none",
            isLoading && "pointer-events-none"
          )} {...getRootProps()} type="button">
            <img alt="New Guild Profile Picture" src={preview ?? undefined} className={cn("w-full h-full object-cover absolute hidden", preview && "block", isLoading && "blur-sm")} />
            <FluentImageAdd20Filled className="text-3xl text-indigo-200/80" />
          </button>
          <input className="hidden" {...form.register("guildPicture")} {...getInputProps()} />
        </Fieldset>
        <Fieldset name="guildName" className="mt-4 flex flex-col items-stretch">
          <Label>Guild Name</Label>
          <Input />
        </Fieldset>
        { }
      </div>

      {/* Footer */}
      <div className={cn(style.dialogFooter)}>
        <button className={cn(style.dialogButton)}
          onClick={props.onBack}
          type="button">Back</button>
        <Button className={cn(style.dialogButton, "mt-0")}>Create</Button>
      </div>
    </Form >
  )
}

function FluentImageAdd20Filled(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" {...props}><path fill="currentColor" d="M10 5.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0Zm-4-2a.5.5 0 0 0-1 0V5H3.5a.5.5 0 0 0 0 1H5v1.5a.5.5 0 0 0 1 0V6h1.5a.5.5 0 0 0 0-1H6V3.5ZM5.5 11a5.5 5.5 0 0 0 4.9-8H14a3 3 0 0 1 3 3v8c0 .65-.206 1.25-.557 1.742l-5.39-5.308a1.5 1.5 0 0 0-2.105 0l-5.39 5.308A2.986 2.986 0 0 1 3 14v-3.6c.75.384 1.6.6 2.5.6Zm7-3a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1Zm0 1a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm-8.235 7.448C4.755 16.796 5.354 17 6 17h8c.646 0 1.245-.204 1.735-.552l-5.384-5.3a.5.5 0 0 0-.702 0l-5.384 5.3Z"></path></svg>
  )
}
