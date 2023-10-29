/* eslint-disable @next/next/no-img-element */
"use client"

import { cn } from "@/lib/tailwind"
import { useSearchParams } from "next/navigation"
import { SVGProps, useRef, useState } from "react"
import { useFormStatus } from "react-dom"
import { useDebouncedCallback } from "use-debounce"
import ProfilePicture from "./pfp"

export default function RegisterForm(p: {
  action: (formData: FormData) => any
  defaultUsername: string
  defaultDisplayname: string
  defaultProfilepicture: string
  suggestProfilepicture: string
}) {

  const [picturelink, setPicturelink] = useState(p.suggestProfilepicture)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const debounced = useDebouncedCallback((value) => { setPicturelink(value) }, 1000)

  return (
    <form className="w-full mt-4" action={ p.action }>
      <ServerErrorCallout />

      <div className="flex flex-col items-center mt-4">
        <ProfilePicture
          error={ error }
          loading={ loading }
          pictureLink={ picturelink ?? "" }
          setError={ setError }
          setLoading={ setLoading }
          defaultPictureLink={ p.defaultProfilepicture }
        />
      </div>

      <fieldset>
        <label htmlFor="displaypicture">Display Picture</label>
        <input
          type="url"
          onChange={ (e) => {
            e.preventDefault()
            debounced(e.target.value)
            setLoading(true)
            setError(false)
        } }
          defaultValue={ p.suggestProfilepicture }
        />
      </fieldset>

      <fieldset>
        <label htmlFor="displayname">Display Name</label>
        <input
          type="text"
          name="displayname"
          required maxLength={ 64 }
          defaultValue={ p.defaultDisplayname }
        />
      </fieldset>

      <fieldset>
        <label htmlFor="username">Username</label>
        <input
          type="text"
          name="username"
          required maxLength={ 24 }
          pattern="[a-zA-Z0-9_]{0,24}"
          defaultValue={ p.defaultUsername }
        />
      </fieldset>

      <FormSubmitButton />
    </form>
  )
}

function FormSubmitButton() {
  const { pending } = useFormStatus()
  return (
    <button className="mt-8 w-full" disabled={ pending } type="submit">Continue</button>
  )
}


export function ServerErrorCallout() {
  const error = useSearchParams().get('error')
  const { pending } = useFormStatus()

  return <div className={ cn(
    "w-full px-3 rounded-md bg-red-500/40",
    "text-sm",
    "shadow-md",
    "flex items-center",
    "overflow-hidden",
    "transition-all",
    "h-0",
    "data-[error=true]:h-[2lh]",
  ) }
    data-error={ !!error && !pending }
  >
    { error }
  </div>
}


