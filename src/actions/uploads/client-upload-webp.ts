"use client"

import { upload } from "@/actions/uploads/client-upload"
import { s_convertToWebpAction } from "./convert-to-webp"

export async function uploadAsWebp(img: Blob, path: `${string}.webp`) {
  // The Image received is in Blob and I would like it to be converted 
  //  form png to webp first.However, you can't send Blob or ArrayBuffer to
  //  the server action. Therefore, we need to create FormData first before
  //  sending it to the server.
  
  if (img.type !== "image/blob")
    throw new Error("Error uploading as Webp: only png is supported")
  
  const formData = new FormData
  formData.append("image", img)

  const webpBufferString = await s_convertToWebpAction(formData)
  const webpBlob = new Blob([Buffer.from(webpBufferString, "ascii")], { type: "image/webp" })

  const imgurl = await upload(webpBlob, path)

  return imgurl
}