"use client"

import { SessionProvider as sp, useSession as useNextAuthSession } from "next-auth/react"
import { useRouter } from "next/navigation"

export function useSession() {
  const router = useRouter()
  const session = useNextAuthSession({
    required: true,
    onUnauthenticated:
      () => {
        // Todo: Better UX, keep the previous URL.
        router.push('/auth')
      }
  })
  if (!session)
    alert("Session Not Found, it should be found as it is prefetched from the server.")

  return {
    ...session,
    getUserId: () => {

    }
  }

}
