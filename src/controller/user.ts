import { getSession } from "@/lib/next-auth"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import { cache } from "react"

export const getUserData = cache(async () => {
    const { email, provider } = await getSession()
    const user = await prisma.user.findUnique({
      where: {
        email_provider: { // unique composite key
          email,
          provider,
        }
      }
    })
    if (!user) redirect('/register')
    // Redirect to /register where user can get onboarded
    //  to fill necessary data on the database'
    return user
})


