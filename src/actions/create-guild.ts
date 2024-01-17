"use server"

import { Auth } from "@/lib/auth/auth-setup"
import prisma from "@/lib/db/prisma"
import { ServerAction } from "@/lib/serveraction/serveraction"
import { Guild } from "@prisma/client"

export async function s_createGuild(
  params: {
    userId: string,
    serverName: string,
    withServerPicture: boolean
  }
) {
  // 
  const user = await Auth.getUserSession()
  if (user.id !== params.userId)
    return { error: "Not Authenticated" }

  try {
    // Move to DB Layer
    const server = await prisma.guild.create({
      data: {
        // metadata
        name: params.serverName,
        profilePicture: params.withServerPicture,
        // relationship
        owner: { connect: { id: params.userId } },
        members: { create: { user: { connect: { id: params.userId } } } }
      }
    })

    return { data: server }
  } catch (error) {
    console.log(error)
    return { error: "Unknown Prisma Error When Creating Server" }
  }
}