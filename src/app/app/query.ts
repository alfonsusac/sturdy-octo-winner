import { createQuery } from "@/components/api/create-query"
import { FriendRequest, Guild, User } from "@prisma/client"
import { UseQueryResult, useQuery } from "@tanstack/react-query"

export const {
  prefetch: prepareGuildsQuery,
  useHook: useGuilds,
} = createQuery<Guild[]>()(['guilds'])({

  addGuild: (prev) =>
    (newData: Guild) => [...prev, newData],
  
  removeGuild: (prev) =>
    (id: string) => prev.filter(g => g.id !== id)
  
})

export function useGuild(id: string) {
  const query = useGuilds({
    select: (guilds) => guilds.find(g => g.id === id) as any
  })
  return query as UseQueryResult<Guild | undefined, Error>
}




export const {
  prefetch: prepareFriendListQuery,
  useHook: useFriendList,
} = createQuery<User[]>()(['friendList'])()

export const {
  prefetch: prepareFriendRequestListQuery,
  useHook: useFriendRequestList,
} = createQuery<FriendRequest[]>()(['friendRequestList'])()

export const {
  prefetch: prefetchUser,
  useHook: useUser,
} = createQuery<Partial<User>>()((userid) => ['user', userid])()
