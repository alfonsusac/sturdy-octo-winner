"use server"

import { Auth } from "@/lib/auth/auth-setup"
import { S3 } from "@/lib/upload/config"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { randomUUID } from "crypto"
import { getServerSession } from "next-auth"

export async function getPresignedURL() {
  const user = await Auth.getUserSession()
  if (!user) throw new Error("Not Authenticated")
  const key = `${user.id}.png`
  const command = new PutObjectCommand({
    Bucket: 'diskott-avatars',
    Key: key,
    ContentType: 'image/png',
  })
  try {
    const signedUrl = await getSignedUrl(S3, command, { expiresIn: 10 })
    return signedUrl
  } catch (error) {
    console.log(error)
    return null
  }
}