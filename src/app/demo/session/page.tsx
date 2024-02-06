import { getServerSession } from "next-auth"
import ClientSession, { SP } from "./client"
import { authOptions } from "@/lib/server/auth-options"
import auth from "@/lib/server/auth"

export default async function Page() {
  const session = await auth.getRawSession()
  return (
    <SP>
      <pre>
        {JSON.stringify(session, null, 1)}
      </pre>
      <ClientSession />
    </SP>
  )
}