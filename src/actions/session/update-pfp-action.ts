"use server"

import z from "zod"
import { prisma } from "@/lib/server/prisma"
import { ServerActionSessionUpdate } from "@/lib/auth/next-auth.client"
import auth from "@/lib/server/auth"


export default async function s_updateProfilePicture(input: { pfp: string }): Promise<ServerActionSessionUpdate> {
  try {
    const { id } = await auth.getSession()

    const res = await prisma.user.update({
      where: { id },
      data: { profilePicture: input.pfp }
    })

    return { data: { picture: res.profilePicture }, error: undefined }

  } catch (error: any) {
    console.log(error)
    return { error: error, data: undefined }
  }
}