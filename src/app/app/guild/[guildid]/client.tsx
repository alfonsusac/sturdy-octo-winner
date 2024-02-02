"use client"

import { Channel } from "@prisma/client"
import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query"
import { useGuilds } from "../../query"

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
      return data.filter(data => data.id === props.guildid )
    }
  })
  
  return query.data?.[0].name

}