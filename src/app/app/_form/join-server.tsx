"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import { cn } from "@/lib/tailwind"
import { style } from "@/style"
import { SVGProps } from "react"
import { joinServer } from "@/actions/join-server"

export type JoinServerInputs = {
  invite: string
}

export default function JoinServerForm(p: {
  toBack: () => void
}) {
  const { register, handleSubmit, formState } = useForm<JoinServerInputs>({
    mode: "onChange",
  })
  const onSubmit: SubmitHandler<JoinServerInputs> = async (data) => {
    console.log(data)
    const res = await joinServer(data)
  }
  return (
    <form onSubmit={ handleSubmit(onSubmit) } className="flex flex-col">
      <div className="flex flex-col p-4 pt-0 items-stretch">
        <fieldset className="mt-4 flex flex-col items-stretch">
          <label className={ cn(style.inputLabel) }>Invite Link</label>
          <input
            className={ cn(style.textInput) }
            placeholder={ `hTKzmaks` }
            defaultValue={ `` }
            { ...register("invite", {
              required: true,
              minLength: 8,
              maxLength: 8,
            }) }
            maxLength={ 8 }
          />
        </fieldset>
      </div>
      <div className={ cn(style.dialogFooter) }>
        <button type="button"
          onClick={ p.toBack }
          className={ cn(style.dialogButton) }
        >
          Back
        </button>
        <button type="submit"
          disabled={ !formState.isValid }
          className={ cn(style.dialogButton, "bg-indigo-600") }
        >
          Join Server
        </button>
      </div>
    </form>
  )
}

function UploadImageButton() {
  return (
    <div className={ cn(
      "self-center",
      "mt-2",
      "w-20 h-20",
      "outline-dashed outline-2 outline-indigo-200/40",
      "rounded-full",
      "flex flex-row items-center justify-center",
      "text-3xl",
      "text-indigo-200/80",
    ) }>
      <FluentImageAdd20Filled />
    </div>
  )
}


function FluentImageAdd20Filled(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 20 20" { ...props }><path fill="currentColor" d="M10 5.5a4.5 4.5 0 1 1-9 0a4.5 4.5 0 0 1 9 0Zm-4-2a.5.5 0 0 0-1 0V5H3.5a.5.5 0 0 0 0 1H5v1.5a.5.5 0 0 0 1 0V6h1.5a.5.5 0 0 0 0-1H6V3.5ZM5.5 11a5.5 5.5 0 0 0 4.9-8H14a3 3 0 0 1 3 3v8c0 .65-.206 1.25-.557 1.742l-5.39-5.308a1.5 1.5 0 0 0-2.105 0l-5.39 5.308A2.986 2.986 0 0 1 3 14v-3.6c.75.384 1.6.6 2.5.6Zm7-3a.5.5 0 1 0 0-1a.5.5 0 0 0 0 1Zm0 1a1.5 1.5 0 1 0 0-3a1.5 1.5 0 0 0 0 3Zm-8.235 7.448C4.755 16.796 5.354 17 6 17h8c.646 0 1.245-.204 1.735-.552l-5.384-5.3a.5.5 0 0 0-.702 0l-5.384 5.3Z"></path></svg>
  )
}