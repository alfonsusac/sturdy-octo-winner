"use server"

import z from "zod"
import { prisma } from "@/lib/server/prisma"
import auth from "@/lib/server/auth"
import { ServerActionSessionUpdate } from "@/lib/client/auth-hooks"


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