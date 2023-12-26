"use client"

import { SessionProvider as sp, useSession as useNextAuthSession } from "next-auth/react"

export function useSession() {
  const session = useNextAuthSession()
  if (!session) alert("Session Not Found, it should be found as it is prefetched from the server.")
  return session
}

export const SessionProvider = sp