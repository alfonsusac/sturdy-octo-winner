"use client"

import { JWT } from "next-auth/jwt"
import { SessionProvider as sp, useSession as useNextAuthSession } from "next-auth/react"
import { JWTUpdateParam } from "./on-register"
import { useRouter } from "next/navigation"

export function useSession() {
  const session = useNextAuthSession({ required: true })
  const router = useRouter()
  if (!session) alert("Session Not Found, it should be found as it is prefetched from the server.")
  return {
    ...session,
    getUserId: () => {
      // Unify this process in the server
      if (!session.data) {
        router.push('/login')
        throw 0
      }
      if (!session.data.user.userid) {
        router.push("/register")
        throw 0
      }
      return session.data.user.userid
    },
    update: async (purpose: string,
      action: () => ServerActionSessionUpdate,
    ) => {
      const res = await action()
      if (res.data) {
        await session.update({
          purpose,
          data: {
            ...res.data
          }
        } satisfies JWTUpdateParam)
      } else {
        throw new Error(res.error)
      }
    }
  }
}

export const SessionProvider = sp

export type ServerActionSessionUpdate = Promise<{
  data: Partial<JWTUpdateParam['data']>
  error: undefined
} | {
  data: undefined
  error: string
}>