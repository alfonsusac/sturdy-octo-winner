import { createQuery } from "@/components/api/create-query"
import { FriendRequest, Guild, User } from "@prisma/client"

export const {
  prefetch: prepareGuildsQuery,
  useHook: useGuilds,
} = createQuery<Guild[]>(['guilds'])

export const {
  prefetch: prepareFriendListQuery,
  useHook: useFriendList,
} = createQuery<User[]>(['friendList'])

export const {
  prefetch: prepareFriendRequestListQuery,
  useHook: useFriendRequestList,
} = createQuery<FriendRequest[]>(['friendRequestList'])

