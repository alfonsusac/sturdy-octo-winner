"use client"

import { s_sendMessage } from "@/actions/crud-message"
import { useSession } from "@/lib/auth/next-auth.client"
import { runServerAction } from "@/lib/serveraction/return"
import { Message } from "@prisma/client"
import { UndefinedInitialDataOptions, useQuery, useQueryClient } from "@tanstack/react-query"
import { ReactQueryDevtools } from "@tanstack/react-query-devtools"
import { FormEvent, useEffect, useRef, useState } from "react"
import { toast } from "sonner"

export let addMessageToList: ((message: Message) => void)
export let removeMessageFromList: ((id: string) => void)
export function useMessages(
  options?: Omit<UndefinedInitialDataOptions<Message[]>, 'queryKey'>
) {
  return useQuery<Message[]>({
    queryKey: ['channel-messages'],
    ...options
  })
}

export function MessageList(
  props: {}
) {
  const queryClient = useQueryClient()
  const { data: messages } = useMessages()
  const listRef = useRef<HTMLDivElement>(null)

  const [newMessageEntered, setNewMessageEntered] = useState(false) 

  addMessageToList = (message) => {
    queryClient.setQueryData(['channel-messages'], (prev: Message[]) => [...prev, message])
    setNewMessageEntered(true)
  }
  useEffect(() => {
    if (newMessageEntered) {
      listRef.current?.scrollTo({ top: listRef.current.scrollHeight })
      setNewMessageEntered(false)
    }
  }, [newMessageEntered])

  removeMessageFromList = (id) => {
    queryClient.setQueryData(['channel-messages'], (prev: Message[]) => prev.filter(g => g.id !== id))
  }

  return (
    <div className="bg-blue-500/0 h-full flex">
      <div
        ref={listRef}
        className="grow max-h-full w-full flex flex-col mt-auto bg-indigo-400/0 py-2 overflow-y-scroll gap-2">
        {/* {
          [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, ].map((_, i) => <div key={ i } className="shrink-0 h-8 w-full bg-red-500/40">
            { i }
          </div>)
        } */}
        {
          messages?.map((message) => (
            <div key={ message.id } className=" shrink-0 h-auto w-full bg-indigo-400/0">
              <div className="opacity-5">
                { message.id }
              </div>
              <div className="opacity-40">
                from { message.sender }
              </div>
              <div>
                { message.content }
              </div>
              <div className="opacity-5">
                { message.created_at.toISOString() }
              </div>
            </div>
          ))
        }
        {/* <ChatList channelid={ context.params.channelid } /> */ }
      </div>
    </div>
  )

}

export function ChatInput(
  props: {
    channelid: string
  }
) {
  const ref = useRef<HTMLInputElement>(null)
  const session = useSession()

  async function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = ref.current!.value

    if (value === "") return
    event.currentTarget.reset()

    try {
      const message = await runServerAction(s_sendMessage, {
        userid: session.getUserId(),
        channelid: props.channelid,
        message: value
      })
      addMessageToList(message)

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
      ref={ ref }
    />
    <button type="submit" className="!hidden" />
  </form>

}