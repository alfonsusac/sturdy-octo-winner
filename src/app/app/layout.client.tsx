"use client"

import { MaterialSymbolsPerson } from "@/components/icon"
import { cn } from "@/lib/tailwind"
import { Session } from "next-auth"
import { SessionProvider, useSession } from "next-auth/react"

export function Providers(p: {
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


export function BaseLayout(p: {
  children: React.ReactNode
}) {

  const session = useSession()
  if(!session) alert("Session Not Found, it should be found as it is prefetched from the server.")

  return (
    <div className={ cn(
      "w-screen h-[100dvh] bg-black",
      "grid grid-flow-row grid-cols-2",
    ) }>
      <div className="w-48 h-full bg-white/10">
        <div className={ cn(
          "p-4",
          "gap-2 align-baseline",
          // "leading-loose"
        ) }>
          <MaterialSymbolsPerson
            className="align-[-0.125em] inline"
          />
          <span className="leading-loose">
            { session.data?.user?.name }
          </span>
        </div>
      </div>
      <div>
        {p.children}
      </div>
    </div>
  )
}