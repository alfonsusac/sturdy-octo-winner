import Providers from "./layout.client"
import { getSession } from "@/lib/next-auth"

export default async function AppLayout(p: {
  children: React.ReactNode
}) {
  const session = await getSession()
  return (
    <Providers session={session} >
      {p.children}
    </Providers>
  )
}