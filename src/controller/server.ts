import { Auth } from "@/lib/auth/next-auth"
import prisma from "@/lib/db/prisma"
import "server-only"

/**
 * Create a server and make the logged in user as owner
 */
export async function createServer({ name, profilePicture }: {
  name: string,
  profilePicture: string,
  ownerID: string
}) {

  const { email } = await Auth.getSession()
  const newServer = await prisma.server.create({
    data: {
      name,
      profilePicture,
      owner: { connect: { email } }
    }
  })

  return newServer

}




