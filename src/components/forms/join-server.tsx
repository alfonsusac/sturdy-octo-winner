"use client"

import { useForm, SubmitHandler } from "react-hook-form"
import { cn } from "@/lib/tailwind"
import { style } from "@/style"
import { joinGuild } from "@/actions/join-guild"

export type JoinGuildInputs = {
  invite: string
}

export default function JoinGuildForm(p: {
  toBack: () => void
}) {
  const { register, handleSubmit, formState } = useForm<JoinGuildInputs>({
    mode: "onChange",
  })
  const onSubmit: SubmitHandler<JoinGuildInputs> = async (data) => {
    console.log(data)
    const res = await joinGuild(data)
  }
  return (
    <form onSubmit={ handleSubmit(onSubmit) } className="flex flex-col">
      <div className="flex flex-col p-4 pt-0 items-stretch">
        <fieldset className="mt-4 flex flex-col items-stretch">
          <label className={ cn("") }>Invite Link</label>
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
          Join Guild
        </button>
      </div>
    </form>
  )
}