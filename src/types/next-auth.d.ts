import { JWT, DefaultJWT } from "next-auth/jwt"
import NextAuth, { DefaultSession } from "next-auth"


declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  interface JWT extends DefaultJWT {
    provider: string
    // userid?: string
    // thisIs: "jwt"
  }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: {
      provider: string
      // id?: string
      // thisIs: "session"
    } & DefaultSession["user"]
  }
}