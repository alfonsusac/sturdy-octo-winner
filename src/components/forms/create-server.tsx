/* eslint-disable @next/next/no-img-element */
"use client"

import { useForm } from "react-hook-form"
import { generateSlug } from "random-word-slugs"
import { cn } from "@/lib/tailwind"
import { style } from "@/style"
import { SVGProps } from "react"
import { Button, Fieldset, Form, Input, Label } from "../base/form"
import * as z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useAvatarUpload } from "../lib/use-avatar-upload"
import { s_convertToWebpAction } from "@/actions/uploads/convert-to-webp"
import { upload } from "../lib/upload"
import { s_createGuild } from "@/actions/create-guild"
import { useSession } from "@/lib/auth/next-auth.client"
import { toast } from "sonner"
import { runServerAction } from "@/lib/serveraction/return"
import { useRouter } from "next/navigation"




// type CreateServerInputs = {
//   serverName: string
//   serverPicture: File
// }

export default function CreateServerForm(
  p: {
    back: () => void
    finish: () => void
  }
) {
  const session = useSession()
  const router = useRouter()

  const formSchema = z.object({
    serverName: z.string().min(1).max(64),
    serverPicture: z.instanceof(Blob).optional()
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      serverName: generateSlug(2, { format: "title" }),
      serverPicture: undefined,
    },
    mode: 'onChange',
  })

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      // const guild = await runServerAction(s_createGuild, {
      //   userId: session.getUserId(),
      //   serverName: data.serverName,
      //   withServerPicture: !!data.serverPicture
      // })

      if (data.serverPicture) {
        // The Image received is in Blob and I would like it to be converted 
        //  form png to webp first.However, you can't send Blob or ArrayBuffer to
        //  the server action. Therefore, we need to create FormData first before
        //  sending it to the server.

        // Create Form Data from File
        const formData = new FormData()
        formData.append("image", data.serverPicture)

        // Convert PNG to WEBP
        const webpBufferString = await s_convertToWebpAction(formData)
        const webpBlob = new Blob([Buffer.from(webpBufferString, "ascii")], { type: "image/webp" })

        await upload(webpBlob, `server/${guild.id}.webp`)
      }

      // router.push()
      toast("finishing")
      p.finish()


    } catch (error: any) {
      console.log(error)
      toast(error.message ?? "Unknown Error Occurred")
    }
  }
  const { getRootProps, getInputProps, preview, isLoading } = useAvatarUpload({
    onImageSelected(originalFile, resizedBlob) {
      console.log("Original File Size", originalFile.size.toLocaleString())
      console.log("Resized size", resizedBlob.size.toLocaleString())
      form.setValue("serverPicture", resizedBlob)
    },
  })



  // const { register, handleSubmit, formState, } = useForm<CreateServerInputs>({
  //   mode: "onChange",
  // })
  // https://www.youtube.com/watch?v=PEGUFi9Sx-U  TUTORIAL HOW TO UPLOAD FILE ✅

  // const onSubmit: SubmitHandler<CreateServerInputs> = async (_, event) => {
  //   const data = new FormData(event?.target)
  //   const file = data.get("serverPicture") as File
  //   console.log(file)
  //   const { key, signedUploadUrl } = await generatePresignedUrl(session.data?.user.userid ?? "", file.name, file.type) // Server Action

  //   // https://www.youtube.com/watch?v=wbNyipJw9rI TUTORIAL HOW TO USE S3 to GENERATE LINK

  //   // p.onSubmit(data) // <- Server Action <- Works :/
  // }

  return (
    <Form { ...form } onSubmit={ onSubmit }>
      {/* Fields */ }
      <div className="flex flex-col p-4 items-stretch">
        <Fieldset name="serverPicture" className="flex flex-col items-stretch">
          <button className={ cn("relative w-20 h-20 mt-2 p-0 self-center rounded-full overflow-hidden text-3xl",
            "outline-dashed outline-2 outline-indigo-200/40",
            "flex flex-row items-center justify-center",
            "hover:shadow-[0px_0px_0px_8px_#717AC233]",
            preview && "outline-none",
            isLoading && "pointer-events-none"
          ) } { ...getRootProps() } type="button">
            {/* {
              isLoading && <div className="absolute inset-0 bg-black/80 z-10 pointer-events-none">
              </div>
            } */}
            <img alt="New Server Profile Picture" src={ preview ?? undefined } className={ cn("w-full h-full object-cover absolute hidden", preview && "block", isLoading && "blur-sm") } />
            <FluentImageAdd20Filled className="text-3xl text-indigo-200/80" />
          </button>
          {/* <small className="block self-center mt-2 text-indigo-300/40 data-[emphasize=true]:text-red-500/80">
            Maximum File Size: 1MB
          </small> */}
          <input className="hidden" { ...form.register("serverPicture") } { ...getInputProps() } />
        </Fieldset>
        {/* <SpinnerSVG className="absolute left-1/2 top-1/2 block text-4xl z-10 -translate-x-1/2 -translate-y-1/2 text-indigo-200/60" /> */ }

        <Fieldset name="serverName" className="mt-4 flex flex-col items-stretch">
          <Label>Server Name</Label>
          <Input />
        </Fieldset>
        { }
      </div>

      {/* Footer */ }
      <div className={ cn(style.dialogFooter) }>
        <button className={ cn(style.dialogButton) }
          onClick={ p.back }
          type="button"
        >Back</button>
        {/* <button type="submit">Create</button> */ }
        <Button className={ cn(style.dialogButton, "mt-0") }>Create</Button>
      </div>
    </Form >
  )


  // const { ref, ...rest } = register('serverPicture')
  // const inputpfpref = useRef<HTMLInputElement | null>(null)
  // const imagepfpref = useRef<HTMLImageElement>(null)
  // const sizelimitref = useRef<HTMLElement>(null)

  // return (
  //   <form
  //     onSubmit={ handleSubmit(onSubmit) }
  //     className={ cn(
  //       "flex flex-col"
  //     ) }
  //   >
  //     <div className="flex flex-col p-4 items-stretch">
  //       <UploadImageButton
  //         inputref={ inputpfpref }
  //         imgref={ imagepfpref }
  //       />
  //       <small className="block self-center mt-2 text-indigo-300/40 data-[emphasize=true]:text-red-500/80"
  //         ref={ sizelimitref }>
  //         Maximum File Size: 1MB
  //       </small>

  //       <input
  //         { ...rest }
  //         ref={ (e) => {
  //           ref(e)
  //           inputpfpref.current = e
  //         } }
  //         // { ...register("serverPicture") }
  //         type="file"
  //         name="serverPicture"
  //         accept="image/*"
  //         className="hidden"
  //         onChange={ (e) => {
  //           const file = e.target.files?.[0]

  //           if (!file) {
  //             console.log("no file"); return
  //           }
  //           if ((file.size / 1024) > 1024) {
  //             sizelimitref.current?.setAttribute("data-emphasize", "true")
  //             e.target.value = ""
  //             return
  //           } else {
  //             sizelimitref.current?.setAttribute("data-emphasize", "false")
  //           }

  //           const fileReader = new FileReader()
  //           fileReader.readAsDataURL(file)
  //           fileReader.onloadend = (e2) => {
  //             const result = e2.target?.result
  //             if (!result)
  //               console.warn("PFPInput OnloadEnd: Result not found??")
  //             else if (imagepfpref.current)
  //               imagepfpref.current.src = result?.toString()
  //             else
  //               console.warn("Input something went wrong?")
  //           }
  //           fileReader.onerror = (e2) => {
  //             console.log("Error!")
  //             console.log(e2)
  //           }
  //           fileReader.onload = (e2) => {
  //             console.log("OnLoad?!")
  //             console.log(e2)
  //             const result = e2.target?.result
  //             if (!result)
  //               console.warn("PFPInput OnloadEnd: Result not found??")
  //             else if (imagepfpref.current) {
  //               imagepfpref.current.src = result?.toString()
  //               imagepfpref.current.setAttribute('data-show', "true")
  //             }
  //             else
  //               console.warn("Input something went wrong?")
  //           }
  //           console.log("Finished")
  //         } }
  //       />

  //       <fieldset className="mt-4 flex flex-col items-stretch">
  //         <label className={ cn(style.inputLabel) }>
  //           Server Name
  //         </label>
  //         <input
  //           className={ cn(style.textInput) }
  //           defaultValue={ `${generateSlug(2, { format: "title" })}` }
  //           { ...register("serverName", {
  //             required: true,
  //             maxLength: 64
  //           }) }
  //           maxLength={ 64 }
  //         />
  //       </fieldset>

  //     </div>

  //     <div className={ cn(style.dialogFooter) }>
  //       <button
  //         className={ cn(style.dialogButton) }
  //         onClick={ p.toBack }
  //         type="button"
  //       >
  //         Back
  //       </button>
  //       <button
  //         className={ cn(style.dialogButton) }
  //         disabled={ !formState.isValid }
  //         type="submit"
  //       >
  //         Create
  //       </button>
  //     </div>
  //   </form>
  // )
}

function FluentImageAdd20Filled(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" { ...props }><path fill="currentColor" d="M10 5.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0Zm-4-2a.5.5 0 0 0-1 0V5H3.5a.5.5 0 0 0 0 1H5v1.5a.5.5 0 0 0 1 0V6h1.5a.5.5 0 0 0 0-1H6V3.5ZM5.5 11a5.5 5.5 0 0 0 4.9-8H14a3 3 0 0 1 3 3v8c0 .65-.206 1.25-.557 1.742l-5.39-5.308a1.5 1.5 0 0 0-2.105 0l-5.39 5.308A2.986 2.986 0 0 1 3 14v-3.6c.75.384 1.6.6 2.5.6Zm7-3a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1Zm0 1a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm-8.235 7.448C4.755 16.796 5.354 17 6 17h8c.646 0 1.245-.204 1.735-.552l-5.384-5.3a.5.5 0 0 0-.702 0l-5.384 5.3Z"></path></svg>
  )
}