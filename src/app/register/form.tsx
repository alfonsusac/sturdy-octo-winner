/* eslint-disable @next/next/no-img-element */
"use client"

import { cn } from "@/lib/tailwind"
import { useRouter, useSearchParams } from "next/navigation"
import { useRef, useState } from "react"
import { useFormStatus } from "react-dom"
import { useDebouncedCallback } from "use-debounce"
import ProfilePicture from "./pfp"
import { useSession } from "next-auth/react"
import { User } from "@prisma/client"
import { JWTUpdateParam } from "@/lib/auth/on-register"
import { registerUser } from "@/actions/session/register-user"

export default function RegisterForm(p: {
  action: (formData: FormData) => Promise<{
    error?: string,
    success?: boolean,
    data?: { user: User, providerId: string, provider: string }
  }>
  defaultUsername: string
  defaultDisplayname: string
  defaultProfilepicture: string
  suggestProfilepicture: string
}) {
  const session = useSession()
  const router = useRouter()

  const [picturelink, setPicturelink] = useState(p.suggestProfilepicture)
  const [loading, setLoading] = useState(false)
  const [pfpError, setPfpError] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string>()
  const debounced = useDebouncedCallback((value) => { setPicturelink(value) }, 1000)

  const dref = useRef<HTMLDivElement>(null)
  const uref = useRef<HTMLDivElement>(null)
  const uinputref = useRef<HTMLInputElement>(null)

  async function onSubmit(data: FormData) {
    return registerUser(data, session,
      {
        onError: (msg) => setErrorMessage(msg),
        onSuccess: () => router.replace('/app')
      }
    )
  }

  return (
    <form className="w-full " action={ onSubmit }>
      <ServerErrorCallout errorMessage={ errorMessage } />

      <div className="flex flex-row justify-center items-center mt-4 mb-8 gap-4">
        <ProfilePicture
          error={ pfpError }
          loading={ loading }
          pictureLink={ picturelink ?? "" }
          setError={ setPfpError }
          setLoading={ setLoading }
          defaultPictureLink={ p.defaultProfilepicture }
        />
        <div className="flex flex-col  ">
          <div className="text-xl h-6 text-ellipsis overflow-hidden whitespace-nowrap max-w-56" ref={ dref }>
            { p.defaultDisplayname }
          </div>
          <div
            className={ cn(
              "opacity-60",
              "before:content-['@'] before:relative before:opacity-40",
              "after:content-['#xxxx'] after:relative after:opacity-40",
            ) }
            ref={ uref }
          >
            { p.defaultUsername }
          </div>
        </div>
      </div>

      <fieldset>
        <label htmlFor="displayname">Display Name<span className="text-red-500/80">*</span></label>
        <input
          type="text"
          name="displayname"
          onChange={ (e) => { dref.current!.innerText = e.target.value } }
          required maxLength={ 64 }
          defaultValue={ p.defaultDisplayname }
        />
      </fieldset>

      <fieldset>
        <label htmlFor="username">Username<span className="text-red-500/80">*</span></label>
        <input
          type="text"
          name="username"
          required maxLength={ 24 }
          onChange={ (e) => {
            uinputref.current!.value = e.target.value
            uref.current!.innerText = e.target.value
          } }
          pattern="[a-zA-Z0-9-_.]{0,24}"
          defaultValue={ p.defaultUsername }
          ref={ uinputref }
        />
        <small className="my-1 opacity-40">
          Allowed characters: alphanumeric, underscore, dash, dot
        </small>

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


export function ServerErrorCallout(p: {
  errorMessage?: string
}) {
  const spError = useSearchParams().get('error')
  const error = p.errorMessage ?? spError
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


