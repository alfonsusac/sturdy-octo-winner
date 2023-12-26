import { AuthOptions, Session, getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { env } from "../env"
import { cache } from "react"
import { AcccountProvider } from "@prisma/client"
import prisma from "../db/prisma"
import { JWT } from "next-auth/jwt"
import redirect from "../navigation"
import { JWTofRegisteredUser } from "@/types/next-auth"
import { getJWTfromOAuth } from "./on-login"
import { registerUserHandler } from "./on-register"


export const authOption: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: env('GOOGLE_CLIENT_ID'),
      clientSecret: env('GOOGLE_CLIENT_SECRET'),
    })
  ],
  callbacks: {

    async jwt({ token, account, user, profile, session, trigger }) {
      // logAuth(`Checking JWT | Trigger: ${trigger ?? "check"}`)
      // console.log(chalk.blue(" Token:"), strObj(token))
      // console.log(chalk.blue(" Account:"), strObj(account))
      // console.log(chalk.blue(" User:"), strObj(user))
      // console.log(chalk.blue(" Profile:"), strObj(profile))
      // console.log(chalk.blue(" Session:"), strObj(session))
      if (trigger === "update") {
        // Updating display name
        if (session.newdisplayname) {
          if (token.email) {
            await prisma.user.update({
              where: { email: token['email'] },
              data: { displayName: session['newdisplayname'] }
            })
            token["name"] = session['newdisplayname']
          }
        }
        if ("rng" in session) { // Testing
          (token as any)["rng"]  = session.rng
        }
      }

      if (trigger === "update" && session && session.purpose === "register") {
        return await registerUserHandler(session, token) as JWT
      }

      if (trigger === "signIn" && account) { // provider is set during signin
        return await getJWTfromOAuth(account, token) as JWT
      }

      return token
    },

    async session({ newSession, session, token, trigger, user }) {
      // if (token.name) {
      //   session.user.name = token.name
      // }

      // Session is retrieved from token.
      // if using jwt, it seems that sessino is retrieved from token only returning default properties. (name, email, emage)
      // logAuth(`Checking Session | Trigger: ${trigger ?? "check"}`)
      // console.log(chalk.blue(" Session:"), strObj(session))
      // console.log(chalk.blue(" NewSession:"), strObj(newSession))
      // console.log(chalk.blue(" Token:"), strObj(token))
      // console.log(chalk.blue(" User:"), strObj(user))

      // if ('rng' in token) {
      //   (session as any).user['rng'] = token['rng'] as any
      // }
      // session.user['provider'] = token['provider']

      return {
        ...session,
        user: {
          ...session.user,
          name: token.name ?? undefined,
          username: token.username ?? undefined,
          email: token.email ?? undefined,
          image: token.picture ?? undefined,
          provider: token.provider ?? undefined,
          userid: token.userid,
          sub: token.sub,
        }
      } satisfies Session
    },

    async redirect({ baseUrl, url }) {
      return url
    }
  }
}

export namespace Auth {
  export const getSession = cache(async () => {
    const session = await getServerSession(authOption)
    if (!session) redirect('/auth')
    if (!session.user) redirect('/auth')
    if (!session.user.email) redirect('/auth')
    if (!session.user.provider) redirect('/auth')
    console.log(session)
    return {
      ...session.user,
      expires: session.expires,
      user: session.user
    } as const
  })

  export const getUserSession = cache(async () => {
    const session = await getSession()
    if (!session.userid) redirect('/register', "No userid in Session (in getUserSession)")

    return {
      session,
      email: session.email,
      name: session.name,
      image: session.image,
      expiryDate: session.expires,
      provider: session.provider as unknown as AcccountProvider,
      id: session.userid
    } as const
  })
}

