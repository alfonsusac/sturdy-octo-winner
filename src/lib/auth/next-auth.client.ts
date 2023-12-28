"use client"

import { JWT } from "next-auth/jwt"
import { SessionProvider as sp, useSession as useNextAuthSession } from "next-auth/react"
import { JWTUpdateParam } from "./on-register"

export function useSession() {
  const session = useNextAuthSession()
  if (!session) alert("Session Not Found, it should be found as it is prefetched from the server.")
  return {
    ...session,
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