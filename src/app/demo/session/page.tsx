import { getServerSession } from "next-auth"
import ClientSession, { SP } from "./client"
import { authOption } from "@/lib/auth/auth-setup"

export default async function Page() {
  const session = await getServerSession(authOption)
  return (
    <SP>
      <pre>
        {JSON.stringify(session, null, 1)}
      </pre>
      <ClientSession />
    </SP>
  )
}