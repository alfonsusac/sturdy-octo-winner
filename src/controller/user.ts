import { getSession } from "@/lib/next-auth"
import prisma from "@/lib/prisma"
import { redirect } from "next/navigation"
import { memoize } from "nextjs-better-unstable-cache"
import { cache } from "react"

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

