import { useSession as useNextAuthSession } from "next-auth/react"

export function useSession() {
  const session = useNextAuthSession()
  if (!session) alert("Session Not Found, it should be found as it is prefetched from the server.")
  return session
}