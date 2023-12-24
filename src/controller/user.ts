import { Auth } from "@/lib/auth/next-auth"
import prisma from "@/lib/db/prisma"
import { logFunc } from "@/lib/devutil"
import { redirect } from "next/navigation"
import { memoize } from "nextjs-better-unstable-cache"
import { cache } from "react"
import "server-only"

/**
 * Get Logged In User's Data.
 */
export const getUserData = cache(async () => {
  logFunc("Getting User Data")

  const { email } = await Auth.getSession()
  const user = await findUserByEmail(email)
  
  if (!user) redirect('/register')
  else return user
})

/**
 * Find a user based on their email.
 */
export const findUserByEmail = cache(async (email?: string) => {
  if(!email) return undefined
  logFunc("Finding User " + email)
  
  return await prisma.user.findUnique({
    where: { email }
  })
})


/**
 * Get OAuth User's Default Image.
 * If doesn't exist, generate it
 */
export const getUserDefaultImage = memoize(

  async (email: string) => {
    const userDefaultImage = await prisma.userDefaultImage.findUnique({ where: { email } })
    if (!userDefaultImage)
      return await prisma.userDefaultImage.create({ data: { email } })
    else return userDefaultImage
  },

  {
    log: ['datacache'],
    logid: "Get User Default Image"
  }
)

