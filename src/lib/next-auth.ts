import { AuthOptions, getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { env } from "./env"

export const authOption: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env('GOOGLE_CLIENT_ID'),
      clientSecret: env('GOOGLE_CLIENT_SECRET'),
    })
  ]
}

export function getSession() {
  return getServerSession(authOption)
}