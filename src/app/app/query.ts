import { createQuery } from "@/components/api/create-query"
import { FriendRequest, Guild, User } from "@prisma/client"

export const {
  prefetch: prepareGuildsQuery,
  useHook: useGuilds,
  mutations
} = createQuery<Guild[]>(['guilds'])({
  addGuild:
    (prev) => (newData: Guild) => [...prev, newData],
  removeGuild:
    (prev) => (id: string) => prev.filter(g => g.id !== id)
})

export const {
  prefetch: prepareFriendListQuery,
  useHook: useFriendList,
} = createQuery<User[]>(['friendList'])()

export const {
  prefetch: prepareFriendRequestListQuery,
  useHook: useFriendRequestList,
} = createQuery<FriendRequest[]>(['friendRequestList'])()

