import { createQuery, prepareQuery } from "@/components/api/create-query"
import { FriendRequest, Guild, User } from "@prisma/client"

export const {
  prefetch: prepareGuildsQuery,
  useHook: useGuilds,
} = createQuery<Guild[]>(['guilds'])

export const {
  prefetch: prefetchFriendList,
  useHook: useFriendList,
} = createQuery<User[]>(['friendList'])

export const {
  prefetch: prefetchFriendRequestList,
  useHook: useFriendRequestList,
} = createQuery<FriendRequest[]>(['friendRequestList'])