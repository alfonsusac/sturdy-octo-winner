"use server"

import { Auth } from "@/lib/auth/auth-setup"
import prisma from "@/lib/db/prisma"
import { nanoid } from "nanoid"

export async function s_createGuild(
  params: {
    userId: string,
    guildName: string,
    withGuildPicture: boolean
  }
) {
  const user = await Auth.getUserSession()
  if (user.id !== params.userId)
    return { error: "Not Authenticated" }

  try {
    // Move to DB Layer
    const guild = await prisma.guild.create({
      data: {
        // metadata
        name: params.guildName,
        profilePicture: params.withGuildPicture,
        // relationship
        owner: { connect: { id: params.userId } },
        members: { create: { user: { connect: { id: params.userId } } } },
        channels: { create: { name: "general" } },
        invites: { create : { inviteKey: nanoid(6) } }
      }
    })

    return { data: guild }
  } catch (error) {
    console.log(error)
    return { error: "Unknown Prisma Error When Creating Guild" }
  }
}

export async function s_deleteGuild(
  params: {
    userId: string,
    guildId: string,
  }
) {
  const user = await Auth.getUserSession()
  if (user.id !== params.userId)
    return { error: "Not Authenticated" }

  try {
    await prisma.guildMember.deleteMany({
      where: {
        guildId: params.guildId
      }
    })
    await prisma.channel.deleteMany({
      where: {
        guildId: params.guildId
      }
    })
    await prisma.guild.delete({
      where: {
        id: params.guildId
      }
    })
    return { data: "" }
  } catch (error) {
    console.log(error)
    return { error: "Unknown Prisma Error When Deleting Guild" }
  }
}