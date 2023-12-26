import { JWT, DefaultJWT } from "next-auth/jwt"
import NextAuth, { DefaultSession } from "next-auth"


export type JWTofRegisteredUser = Required<JWT>
export type SessionOfRegisteredUser = Required<Session>
export type ExtendedAttribute = {
  userid?: string,
  username?: string, // 
  provider: string, // provider type
  sub: string
}

declare module "next-auth/jwt" {
  /** Returned by the `jwt` callback and `getToken`, when using JWT sessions */
  // interface JWT extends DefaultJWT, ExtendedAttribute {
  //   sub: string
  // }
  type JWT = ExtendedAttribute & {
    name?: string,
    email?: string,
    picture?: string,
    sub: string
  }
}

declare module "next-auth" {
  /**
   * Returned by `useSession`, `getSession` and received as a prop on the `SessionProvider` React Context
   */
  interface Session {
    user: DefaultSession["user"] & ExtendedAttribute
  }
}