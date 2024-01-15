import { Auth } from "@/lib/auth/auth-setup"
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

  const { id } = await Auth.getUserSession()
  // const newServer = await prisma.server.create({
  //   data: {
  //     name,
  //     profilePicture,
  //     owner: { connect: { id } }
  //   }
  // })

  // return newServer

}




