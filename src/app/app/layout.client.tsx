"use client"

import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"

export default function Providers(p: {
  children: React.ReactNode
  session: Session | null
}) {
  return (
    <SessionProvider
      session={ p.session }
    >
      {p.children}
    </SessionProvider>
  )
}