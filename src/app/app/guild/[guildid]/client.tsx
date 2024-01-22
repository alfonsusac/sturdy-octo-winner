import { Channel } from "@prisma/client"
import { UndefinedInitialDataOptions, useQuery } from "@tanstack/react-query"

export function useChannel(
  channelid: string,
  options?: Omit<UndefinedInitialDataOptions<Channel>, 'queryKey'>
) {
  return useQuery<Channel>({
    queryKey: ['channel', channelid],
    ...options
  })
}