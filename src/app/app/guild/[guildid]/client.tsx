"use client"

import { Channel } from "@prisma/client"
import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query"
import { useGuilds } from "../../query"
import Image from "next/image"
import { getUserPublicInfo } from "./action"
import { toast } from "sonner"
import { ReactNode, useState } from "react"

export function useChannel(
  channelid: string,
  options?: Omit<UndefinedInitialDataOptions<Channel>, 'queryKey'>
) {
  return useQuery<Channel>({
    queryKey: ['channel', channelid],
    ...options
  })
}

export function GuildName(
  props: {
    guildid: string
  }
) {
  const query = useGuilds({
    select(data) {
      return data.filter(data => data.id === props.guildid)
    }
  })

  return query.data?.[0].name
}

export function ServerMemberItem(
  props: { userid: string }
) {
  const query = useQuery({
    queryKey: ['user', props.userid],
    queryFn: async () => {
      toast(`Fetching user info: ${ props.userid }`)
      return await getUserPublicInfo(props.userid)
    }
  })

  return (
    <div className="flex-none flex gap-2">
      <div className="relative flex-none w-6 h-6 rounded-full bg-black/10 overflow-hidden">
        <Image
          unoptimized
          fill
          alt=""
          src={query.data?.profilePicture ?? ""}
        />
      </div>
      <div className="flex-auto flexlist justify-center">
        <div>{ query.data?.displayName }</div>
      </div>
    </div>
  )
}
