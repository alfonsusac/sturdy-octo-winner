import { getQueryClient, prepareQuery } from "@/components/api/create-query"
import { Auth } from "@/lib/auth/auth-setup"
import prisma from "@/lib/db/prisma"
import { logFunc } from "@/lib/devutil"
import redirect from "@/lib/navigation"
import { memoize } from "nextjs-better-unstable-cache"
import { cache } from "react"
import "server-only"

// -----------------------------------------------
// Get Session User Data (from DB)
// -----------------------------------------------
export const getSessionUserData = cache(async () => {
  logFunc("Getting User Data")

  const { id } = await Auth.getUserSession()
  const user = await findUserById(id)

  prepareQuery(['user', id], user)

  if (!user) redirect('/register', "No user found with that id (getSessionUserData)")
  else return user
})

// -----------------------------------------------
// Find a user based on their email.
// -----------------------------------------------

export const findUserByEmail = cache(async (
  email: string
) => {
  logFunc("Finding User By Email" + email)
  return await prisma.user.findUnique({ where: { email } })
})

export const findUserById = cache(async (
  userid: string
) => {
  logFunc("Finding User By ID", userid)
  return await prisma.user.findUnique({ where: { id: userid } })
})

/** -----------------------------------------------
 * Get OAuth User's Default Image.
 * If doesn't exist, generate it
 * -----------------------------------------------
 */
export const getUserDefaultImage = memoize(
  async (
    email: string
  ) => {
    logFunc("Getting User Default Image", email)
    const userDefaultImage = await prisma.userDefaultImage.findUnique({ where: { email } })
    if (!userDefaultImage)
      return await prisma.userDefaultImage.create({ data: { email } })
    else return userDefaultImage
  },

  { log: ['datacache'], logid: "Get User Default Image" }
)

// -----------------------------------------------
// Get Guild List
// -----------------------------------------------

export const getUserGuildList = cache(
  async () => {
    const { id } = await Auth.getUserSession()
    const guilds = await prisma.guild.findMany({
      where: {
        members: {
          some: {
            userId: id
          }
        }
      }
    })
    return guilds
  }
)