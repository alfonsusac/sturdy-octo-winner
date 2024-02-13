"use client"

import { ComponentPropsWithoutRef, ReactNode, Ref, forwardRef } from "react"
import { useActivePath } from "@/components/api/use-active-path"
import { useParams, useRouter } from "next/navigation"
import { cn } from "@/lib/shared/tailwind"
import { Slot } from "@radix-ui/react-slot"


export const ChannelListItem = forwardRef(
  function ChanelListItem(
    props: ComponentPropsWithoutRef<"button"> & {
      path: string,
    },
    ref: Ref<HTMLButtonElement>
  ) {
    const { className, path, ...rest } = props
    const selected = useActivePath(path)
    const router = useRouter()

    return <ChannelListItemButton
      data-selected={ selected }
      onClick={ () => {
        if (!selected) {
          router.push(path)
        }
      } }
      ref={ ref }
      {...rest}
    />
  }
)

export const ChannelListItemButton = forwardRef(
  function ChannelListItemButton(
    props: ComponentPropsWithoutRef<"button">,
    ref: Ref<HTMLButtonElement>
  ) {
    const { className, ...rest } = props
    return <button
      className={ cn(
        "group px-2 h-[1.9rem] text-[0.85rem] rounded-md select-none leading-normal",
        "flex gap-1.5 items-center",
        "text-indigo-200/50 hover:bg-indigo-300/5 shrink-0 text-left duration-75",
        "data-[selected=true]:bg-indigo-200/10",
        "data-[selected=true]:text-white",
        className
      ) }
      ref={ ref }
      { ...rest }
    />

  }
)

export function GuildHomeButton(
  props: {
    children: ReactNode
  }
) {
  const params = useParams() as { guildid: string, channelid: string }
  const selected = useActivePath(`/${params.guildid}`)
  const router = useRouter()

  return <Slot
    data-selected={ selected }
    onClick={ () => {
      if (!selected) {
        router.push(`/${params.guildid}`)
      }
    } }
  >
    { props.children }
  </Slot>
}