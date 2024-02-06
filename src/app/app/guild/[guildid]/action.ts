"use server"

import { prisma } from "@/lib/server/prisma"

export async function getUserPublicInfo(id: string) {
  const user = await prisma.user.findUnique({ where: { id } })
  if (!user) return { error: "User not found" }

  return {
    id: user.id,
    displayName: user.displayName,
    profilePicture: user.profilePicture,
  }
}