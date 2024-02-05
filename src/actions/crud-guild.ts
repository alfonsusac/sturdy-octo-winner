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
        invites: { create: { inviteKey: nanoid(8) } }
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
    await prisma.guildInvite.deleteMany({ where: { guildId: params.guildId } })
    await prisma.guildMember.deleteMany({ where: { guildId: params.guildId } })
    await prisma.channel.deleteMany({ where: { guildId: params.guildId } })
    await prisma.guild.delete({ where: { id: params.guildId } })
    return { data: "" }
  } catch (error) {
    console.log(error)
    return { error: "Unknown Prisma error when deleting guild" }
  }
}

export async function s_joinGuild(
  params: {
    userId: string,
    inviteKey: string
  }
) {
  const user = await Auth.getUserSession()
  if (user.id !== params.userId)
    return { error: "Not Authenticated" }

  try {
    const invite = await prisma.guildInvite.findUnique({
      where: { inviteKey: params.inviteKey },
    })

    if (!invite) {
      return { data: { fail: "notfound", guild: undefined } } as const
    }

    const isMember = await prisma.guildMember.findUnique({
      where: {
        guildId_userId: {
          guildId: invite.guildId,
          userId: user.id
        }
      },
      include: {
        guild: true
      }
    })

    if (isMember) {
      return { data: { fail: "alreadymember", guild: isMember.guild}} as const
    }
    
    const member = await prisma.guildMember.create({
      data: {
        guildId: invite.guildId,
        userId: user.id
      },
      select: {
        guild: {}
      }
    })

    return { data: { fail: undefined, guild: member.guild } } as const
  } catch (error) {
    console.log(error)
    return { error: "Unknown Prsiam error when joining guild" }
  }
}