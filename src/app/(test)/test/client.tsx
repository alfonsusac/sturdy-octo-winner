"use client"

import { AvatarPicker } from "@/components/base/avatar-picker"
import { SessionProvider as SP, useSession } from "next-auth/react"

export function UpdateSession() {
  const session = useSession()
  return (
    <>
      <pre>
        {JSON.stringify(session, null, 1)}
      </pre>
      <button onClick={ () => session.update({ rng: Math.random().toFixed(3) }) }>
        { !session.data ? "Loading" : "Update Session" }
      </button>
      <AvatarPicker />
    </>
  )
}

export const SessionProviderClientComp = SP