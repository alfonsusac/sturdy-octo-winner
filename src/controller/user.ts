import { getSession } from "@/lib/auth/next-auth"
import prisma from "@/lib/db/prisma"
import { redirect } from "next/navigation"
import { memoize } from "nextjs-better-unstable-cache"
import { cache } from "react"
import "server-only"

/**
 * Get Logged In User's Data.
 */
export const getUserData = cache(async () => {

  const { email } = await getSession()
  const user = await prisma.user.findUnique({
    where: { email }
  })

  if (!user) redirect('/register')
  else return user
  
})


/**
 * Get OAuth User's Default Image.
 * If doesn't exist, generate it
 */
export const getUserDefaultImage = memoize(

  async (email: string) => {
    const userDefaultImage = await prisma.userDefaultImage.findUnique({ where: { email } })
    if (!userDefaultImage)
      await prisma.userDefaultImage.create({ data: { email } })
    else return userDefaultImage
  },

  {
    log: ['datacache'],
    logid: "Get User Default Image"
  }
)

