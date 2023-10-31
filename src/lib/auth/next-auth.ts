import { AuthOptions, Session, getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { env } from "../env"
import { redirect } from "next/navigation"
import { cache } from "react"
import { JWT } from "next-auth/jwt"
import { AcccountProvider } from "@prisma/client"


export const authOption: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env('GOOGLE_CLIENT_ID'),
      clientSecret: env('GOOGLE_CLIENT_SECRET'),
    })
  ],
  callbacks: {

    async jwt({
      token,
      account,
      user,
      profile,
      session,
      trigger
    }) {
      // console.log("JWT callback")
      // console.log(account)
      // console.log(token)
      if (account) // On Sign in, store provider in token
        token['provider'] = account.provider
      return token
    },

    async session({ newSession, session, token, trigger, user }) {
      // console.log("Session callback")
      // console.log(session)
      if (session.user)
        session.user['provider'] = token['provider']
      return session
    },

    async redirect({ baseUrl, url }) {
      console.log(`Redirecting - Base: ${baseUrl} | Url: ${url}`)
      return url
    }
  }
}


export const getSession = cache(async () => {
  const session = await getServerSession(authOption)
  if (!session) redirect('/auth')
  if (!session.user) redirect('/auth')
  if (!session.user.email) redirect('/auth')
  if (!session.user.provider) redirect('/auth')
  return {
    session,
    email: session.user.email,
    name: session.user.name,
    image: session.user.image,
    expiryDate: session.expires,
    provider: session.user.provider as unknown as AcccountProvider,
  }
})

