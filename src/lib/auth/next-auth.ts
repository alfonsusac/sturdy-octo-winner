import { AuthOptions, getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { env } from "../env"
import { redirect } from "next/navigation"
import { cache } from "react"
import { AcccountProvider } from "@prisma/client"
import { logAuth } from "../devutil"


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
      logAuth("Checking JWT")
      if (account) { // provider is set during signin
        token['provider'] = account.provider
      }
      return token
    },

    async session({ newSession, session, token, trigger, user }) {
      // Session is retrieved from token. 
      // if using jwt, it seems that sessino is retrieved from token only returning default properties. (name, email, emage)
      logAuth("Checking Session")
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

