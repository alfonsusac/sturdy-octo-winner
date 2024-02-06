import { AuthOptions, Session, getServerSession } from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import { env } from "../env"
import { cache } from "react"
import { AcccountProvider } from "@prisma/client"
import { prisma } from "@/lib/server/prisma"
import { JWT } from "next-auth/jwt"
import redirect from "../server/navigation"
import { getJWTfromOAuth } from "./on-login"
import { registerUserHandler } from "./on-register"
import { onUpdateHandler } from "./on-update"
import CredentialsProvider from "next-auth/providers/credentials"
import chalk from "chalk"
import { strObj } from "../util"

// const googleProvider = GoogleProvider({
//   clientId: env('GOOGLE_CLIENT_ID'),
//   clientSecret: env('GOOGLE_CLIENT_SECRET'),
// })

// const localProvider = CredentialsProvider({
//   name: 'Offline',
//   credentials: {},
//   async authorize(credentials, req) {
//     return {
//       id: 'aabbccdd-eeff-gghh-iijj-kkllmmnnoo',
//       name: 'AnyaForger',
//       email: 'anya.forger@yorfam.com',
//     }
//   },
// })


// export const authOption: AuthOptions = {
//   providers: process.env.NODE_ENV === "development" ? [googleProvider, localProvider] : [googleProvider],
//   callbacks: {

//     async jwt({ token, account, user, profile, session, trigger }) {

//       if (trigger === "update" && session && session.purpose === "register") {
//         return await registerUserHandler(session, token) as JWT
//       } else if (trigger === "update") {
//         return await onUpdateHandler(session, token) as JWT
//       }

//       if (trigger === "signIn" && account) { // provider is set during signin
//         return await getJWTfromOAuth(account, token) as JWT
//       }

//       return token
//     },

//     async session({ newSession, session, token, trigger, user }) {
//       // if (token.name) {
//       //   session.user.name = token.name
//       // }

//       // Session is retrieved from token.
//       // if using jwt, it seems that sessino is retrieved from token only returning default properties. (name, email, emage)


//       // if ('rng' in token) {
//       //   (session as any).user['rng'] = token['rng'] as any
//       // }
//       // session.user['provider'] = token['provider']

//       // Mutate data for getServerSessions
//       session.user.username = token.username ?? undefined
//       session.user.provider = token.provider ?? undefined
//       session.user.userid = token.userid ?? undefined
//       session.user.sub = token.sub ?? undefined

//       const newNewSession = {
//         ...session,
//         user: {
//           ...session.user,
//           name: token.name ?? undefined,
//           username: token.username ?? undefined,
//           email: token.email ?? undefined,
//           image: token.picture ?? undefined,
//           provider: token.provider ?? undefined,
//           userid: token.userid,
//           sub: token.sub,
//         }
//       } satisfies Session

//       // console.log(newNewSession)

//       // Return session for useSession
//       return newNewSession
//     },

//     async redirect({ baseUrl, url }) {
//       return url
//     }
//   }
// }