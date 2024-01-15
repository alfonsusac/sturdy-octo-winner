"use server"

import { Auth } from "@/lib/auth/auth-setup"
import { S3 } from "@/lib/upload/config"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

export async function getPresignedURL(pathAndKey: string, type?: string) {
  const user = await Auth.getUserSession()
  if (!user) throw new Error("Not Authenticated")
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

// export async function getPresignedURLForUserProfilePicture() {
//   const user = await Auth.getUserSession()
//   if (!user) throw new Error("Not Authenticated")
//   return await getPresignedURL(`user/${user.id}${user.image?.at(-5) === '0' ? "1" : user.image?.at(-5) === "1" ? "0" : "1"}.png`)
// }

// export async function getPresignedURLForServerImage(serverid: string) {
//   const user = await Auth.getUserSession()
//   if (!user) throw new Error("Not Authenticated")
//   return await getPresignedURL(`server/${serverid}.webp`)
// }