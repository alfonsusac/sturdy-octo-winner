"use server"

import z from "zod"
import { prisma } from "@/lib/server/prisma"
import { ServerActionSessionUpdate } from "@/lib/auth/next-auth.client"
import auth from "@/lib/server/auth"


export default async function s_updateDisplayname(input: { displayname: string }): Promise<ServerActionSessionUpdate> {
  try {
    const { id } = await auth.getSession()
  
    const res = await prisma.user.update({
      where: { id },
      data: { displayName: input.displayname }
    })
  
    return { data: { name: res.displayName }, error: undefined }

  } catch (error: any) {
    console.log(error)
    return { error: error, data: undefined }
  }
}