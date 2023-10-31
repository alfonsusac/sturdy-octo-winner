import { getSession } from "@/lib/auth/next-auth"
import prisma from "@/lib/db/prisma"
import { redirect } from "next/navigation"
import { memoize } from "nextjs-better-unstable-cache"
import { cache } from "react"

class LoggedInUser {
  static getData = cache(async () => {
    const { email } = await getSession()
    const user = await prisma.user.findUnique({
      where: { email }
    })
    if (!user) redirect('/register')
    // Redirect to /register where user can get onboarded
    //  to fill necessary data on the database'
    return user
  })

  // Close to idempotent so cache is necessary
  static getDefaultImage = memoize(async (email: string) => {
    const userDefaultImage = await prisma.userDefaultImage.findUnique({ where: { email } })
    if (!userDefaultImage)
      await prisma.userDefaultImage.create({ data: { email } })
    return userDefaultImage
  }, {
    log: ['datacache'],
    logid: "Get User Default Image"
  })
}


export const getUserData = cache(async () => {
    const { email } = await getSession()
    const user = await prisma.user.findUnique({
      where: { email }
    })
    if (!user) redirect('/register')
    // Redirect to /register where user can get onboarded
    //  to fill necessary data on the database'
    return user
})

export const getUserDefaultImage = memoize(async (email: string) => {
  const userDefaultImage = await prisma.userDefaultImage.findUnique({ where: { email } })
  if (!userDefaultImage)
    await prisma.userDefaultImage.create({ data: { email } })
  return userDefaultImage
}, {
  log: ['datacache'],
  logid: "Get User Default Image"
})

