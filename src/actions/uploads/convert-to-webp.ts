"use server"

import sharp from "sharp"

export async function s_convertToWebpAction(form: any) {
  
  // console.log(form)
  // console.log(form.get("image") as File)
  console.log(form.get("image"))

  const file = form.get("image") as File
  const arrayBuffer = await file.arrayBuffer()
  const buffer = await sharp(arrayBuffer).webp({ quality: 1 }).toBuffer()
  console.log("Size before converted", file.size)
  console.log("Buffer size after converted", buffer.byteLength)
  return buffer.toString("binary")
  
  // console.log(file.get("serverPicture") as File)
  // const img = file.get("serverPicture") as File
  // console.log(img.arrayBuffer())
  // const buffer = sharp(file).resize(512, 512).webp().toBuffer()
  // return Buffer.from("")
}