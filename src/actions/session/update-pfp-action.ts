"use server"

import z from "zod"
import prisma from "@/lib/db/prisma"
import { Auth } from "@/lib/auth/auth-setup"
import { ServerActionSessionUpdate } from "@/lib/auth/next-auth.client"


export default async function updateProfilePicture(input: { pfp: string }): Promise<ServerActionSessionUpdate> {
  try {
    const { userid } = await Auth.getSession()

    const res = await prisma.user.update({
      where: { id: userid },
      data: { profilePicture: input.pfp }
    })

    return { data: { picture: res.profilePicture }, error: undefined }

  } catch (error: any) {
    console.log(error)
    return { error: error, data: undefined }
  }
}