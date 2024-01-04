"use client"

import { SessionProvider, useSession } from "next-auth/react"

export default function ClientSession() {
  const session = useSession()
  return (
    <pre>
      {JSON.stringify(session, null, 1)}
    </pre>
  )
}

export const SP = SessionProvider