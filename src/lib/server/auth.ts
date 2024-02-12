import { getServerSession } from "next-auth"
import { cache } from "react"
import { authOptions } from "./auth-options"
import redirect from "./navigation"
import { AcccountProvider } from "@prisma/client"
import { cookies } from "next/headers"

const auth = {

  logout:
    () => cookies().delete('next-auth.session-token'),
    

  getRawSession:
    cache(async () => {
      return await getServerSession(authOptions)
    }),

  getSession:
    cache(async <AllowNoUserId extends boolean = false>(
      options?: {
        allowNoUserId?: AllowNoUserId // boolean
      }
    ) => {
      const session = await auth.getRawSession()

      if (
        !session ||
        !session.user ||
        !session.user.email ||
        !session.user.provider
      ) {
        // Todo: Redirect to auth and pass last URL so that when they log in, it will be redirected back to previously known locations
        redirect('/auth')
      }

      if (!options?.allowNoUserId) {
        if (!session.user.userid) redirect('/register', "getSession: No userid in Session ,need to register")
        if (!session.user.username) redirect('/register')
        if (!session.user.name) redirect('/register')
      }

      type OptionalFieldWhenNoUserIdIsAllowed = AllowNoUserId extends true ? string | undefined : string

      return {
        // ...session.user,
        expiryDate: session.expires,

        // Always available during first time SSO
        email: session.user.email,
        provider: session.user.provider,
        sub: session.user.sub,

        // Always available after registration
        name: session.user.name as OptionalFieldWhenNoUserIdIsAllowed,
        image: session.user.image as OptionalFieldWhenNoUserIdIsAllowed,
        id: session.user.userid as OptionalFieldWhenNoUserIdIsAllowed,
        username: session.user.username as OptionalFieldWhenNoUserIdIsAllowed,
      } as const
    }),
}


export default auth
