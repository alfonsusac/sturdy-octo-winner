import { Auth, authOption } from "@/lib/auth/auth-setup"
import { getServerSession } from "next-auth"
import { Providers } from "../app/client"
import { SessionProviderClientComp, UpdateSession } from "./client"

export default async function Page() {
  
  return (
    <SessionProviderClientComp>
      <UpdateSession />
    </SessionProviderClientComp>
  )
  
  
  
  
  
  
  
  
  const session = await getServerSession(authOption)
  


  return (
    <Providers session={session}>
      <pre>{ JSON.stringify(session, null, 1) }</pre>
      <UpdateSession />
    </Providers>
    )
}