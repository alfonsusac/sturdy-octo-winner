"use server"

import auth from "@/lib/server/auth"
import { S3 } from "@/lib/server/s3"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

export async function s_getPresignedURL(pathAndKey: string, type?: string) {
  -await auth.getSession()
  const command = new PutObjectCommand({
    Bucket: 'diskott-avatars',
    Key: pathAndKey,
    ContentType: type
  })
  try {
    const signedUrl = await getSignedUrl(S3, command, { expiresIn: 10 })
    return signedUrl
  } catch (error) {
    console.log("Error getting presigned url")
    console.log(error)
    return null
  }
}