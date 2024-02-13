"use client"

import { SessionProvider as sp, useSession as useNextAuthSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { JWTUpdateParam } from "../server/auth-callbacks"

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

  if (!session) {
    alert("Session Not Found, it should be found as it is prefetched from the server.")
    throw new Error("Session not found or SessionContextProvider not found")
  }
  
  const userdata = session.data?.user

  if (!userdata) {
    router.push('/login')
    throw new Error('Not authenticated')
  }

  const userid = userdata.userid

  if (!userid) {
    router.push("/register")
    throw new Error('Not registered')
  }

  userdata
  
  async function update(
    purpose: string,
    serverAction: () => ServerActionSessionUpdate
  ) {
    const res = await serverAction()

    if (res.error !== undefined) {
      throw new Error(res.error)
    }

    await session.update({ purpose, data: res.data })
  }

  return {
    ...userdata,
    userid,
    expires: session.data?.expires!,
    update
  }

}


export type ServerActionSessionUpdate = Promise<{
  data: Partial<JWTUpdateParam['data']>
  error: undefined
} | {
  data: undefined
  error: string
}>



export const SessionProvider = sp
