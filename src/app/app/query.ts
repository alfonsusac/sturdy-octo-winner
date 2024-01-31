import { createQuery } from "@/components/api/create-query"
import { Guild } from "@prisma/client"

export const {
  prefetch: prefetchGuilds,
  useHook: useGuilds
} = createQuery<Guild[]>({
  queryKey: ['guilds']
})

