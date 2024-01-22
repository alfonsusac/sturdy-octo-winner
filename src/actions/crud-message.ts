"use server"

import { Auth } from "@/lib/auth/auth-setup"
import prisma from "@/lib/db/prisma"

export async function s_sendMessage(
  params: {
    userid: string
    channelid: string
    message: string
  }
) {
  const user = await Auth.getUserSession()
  if (user.id !== params.userid)
    return { error: "Not Authenticated" }

  // todo: check if user has channelid
  if(params.message === "") return { error: "message is required" }

  try {
    const message = await prisma.message.create({
      data: {
        content: params.message,
        channelId: params.channelid,
        sender: params.userid
      }
    })
    return { data: message }
  } catch (error) {
    return { error: "Unknown Prisma error when sending message" }
  }
  
}