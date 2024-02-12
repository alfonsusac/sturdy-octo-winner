/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
"use client"

import { s_sendMessage } from "@/actions/crud-message"
import { useSession } from "@/lib/auth/next-auth.client"
import { runServer } from "@/lib/client/server-action"
import { Message } from "@prisma/client"
import { UndefinedInitialDataOptions, useQuery, useQueryClient } from "@tanstack/react-query"
import { FormEvent, ReactNode, useEffect, useRef, useState } from "react"
import ReactTextareaAutosize from "react-textarea-autosize"
import { toast } from "sonner"
import { useChannelMessages } from "./query"




export function MessageList(
  props: {
    channelid: string
  }
) {
  const { data: messages } = useChannelMessages([props.channelid])
  const listRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (listRef.current) {
      listRef.current.scrollTop = listRef.current.scrollHeight
    }
  }, [messages])

  useEffect(() => {
    if (listRef.current) {
      listRef.current.style.opacity = "1"
    }
  }, [])

  return (
    <div className="bg-blue-500/0 h-full flex">
      <div
        ref={listRef}
        className="opacity-0 grow max-h-full w-full flex flex-col mt-auto bg-indigo-400/0 py-2 overflow-y-scroll gap-1 pb-4"
      >
        {
          messages?.map((message, i) => (
            <MessageItem key={i} message={message} />
          ))
        }
      </div>
    </div>
  )

}

function MessageItem(
  props: {
    message: Message
  }
) {
  const session = useSession()
  const { data: senderUser } = useQuery({
    queryKey: ['user-data', props.message.sender],
    initialData: () => {
      if (props.message.sender === session.getUserId()) {
        return {
          id: session.getUserId(),
          image: session.data!.user.image!,
          name: session.data!.user.name!,
        }
      }
    }
  })

  const { message } = props
  return (
    <div className="shrink-0 h-auto w-full bg-indigo-400/0 hover:bg-black/5 py-2 px-4 rounded-r-md
      flex gap-3
    ">
      <div className="rounded-full overflow-hidden w-8 h-8 shrink-0">
        <img src={senderUser?.image} />
      </div>
      <div className="">
        <div className="flex gap-2 items-baseline">
          <div className="">
            {senderUser?.name}
          </div>
          <div className="text-indigo-300/30 text-[0.65rem] font-medium">
            {message.created_at.toUTCString()}
          </div>
        </div>
        <div className="font-normal opacity-80">
          {message.content.split('\n').map((l, i) => <p key={i}>{l}</p>)}
        </div>
      </div>
    </div>
  )
}


export function ChatInput(
  props: {
    children: ReactNode
  }
) {

  return (
    <div className="shrink-0 w-auto -mt-1 bg-[#212231] rounded-lg px-4
      flex flex-row gap-2 items-center
      focus-within:outline
      focus-within:outline-4
      focus-within:outline-indigo-300/10
      shadow-xl mx-4 z-[1]
    ">
      { props.children }
    </div>
  )
  
}

export function ChatInputField(
  props: {
    channelid: string
  }
) {
  const ref = useRef<HTMLTextAreaElement>(null)
  const session = useSession()
  const { addMessage } = useChannelMessages([props.channelid])
  const [value, setValue] = useState("")

  async function submitHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const value = ref.current!.value

    if (value === "") return
    setValue("")
    event.currentTarget.reset()

    try {
      const message = await runServer(s_sendMessage, {
        userid: session.getUserId(),
        channelid: props.channelid,
        message: value
      })
      addMessage(message)

    } catch (error) {
      console.log(error)
      toast.error("Error submitting to form")
    }
  }

  const formref = useRef<HTMLFormElement>(null)
  const buttonref = useRef<HTMLButtonElement>(null)

  return (
    <form
      onSubmit={submitHandler}
      className="w-full m-0 p-0"
      autoComplete="off"
      name="chat-input"
      ref={formref}
    >
      <ReactTextareaAutosize
        value={value}
        onChange={e => {
          e.preventDefault()
          if (e.currentTarget.value.at(-1) === '\n') {

          } else {
            setValue(e.currentTarget.value)
          }
        }}
        name="message"
        className="bg-transparent placeholder:text-indigo-300/30 focus:outline-none max-w-none text-sm text-wrap whitespace-normal block w-full h-9 p-2 resize-none"
        placeholder="Message #channel"
        autoComplete="nope"
        autoCorrect="nope"
        ref={ref}
        onKeyDown={(event) => {
          if (event.key === "Enter" && !event.shiftKey) {
            formref.current?.requestSubmit(buttonref.current)
          }
          if (event.key === "Enter" && event.shiftKey) {
            setValue(prev => prev + "\n")
          }
        }}
      />
      <button type="submit" className="!hidden" ref={buttonref} />
    </form>
  )

}