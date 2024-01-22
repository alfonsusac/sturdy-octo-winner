"use client"

import { s_sendMessage } from "@/actions/crud-message"
import { useSession } from "@/lib/auth/next-auth.client"
import { runServerAction } from "@/lib/serveraction/return"
import { useQueryClient } from "@tanstack/react-query"
import { FormEvent, useRef } from "react"
import { toast } from "sonner"

export function ChatInput(
  props: {
    channelid: string
  }
) {
  const ref = useRef<HTMLInputElement>(null)
  const session = useSession()
  const queryClient = useQueryClient()

  async function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = ref.current!.value

    if(value === "") return
    // toast(`Message: onclick action: ${ref.current!.value}`)
    event.currentTarget.reset()

    try {
      await runServerAction(s_sendMessage, {
        userid: session.getUserId(),
        channelid: props.channelid,
        message: value
      })
    } catch (error) {
      console.log(error)
      toast.error("Error submitting to form")
    }
  }


  return <form
    onSubmit={ submitHandler }
    className="w-full"
    autoComplete="off"
  >
    <input
      name="message"
      className="bg-transparent placeholder:text-indigo-300/30 focus:outline-none max-w-none"
      placeholder="Message #channel"
      autoComplete="nope"
      autoCorrect="nope"
      ref={ref}
    />
    <button type="submit" className="!hidden" />
  </form>
  
}