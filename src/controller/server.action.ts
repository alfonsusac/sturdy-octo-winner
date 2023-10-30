"use server"

import prisma from "@/lib/prisma"
import { getUserData } from "./user"
import { redirect } from "next/navigation"
import { Server } from "@prisma/client"
import { S3Client, ListBucketsCommand } from "@aws-sdk/client-s3";

export const createNewServer = async (
  name: string,
  pfp: Buffer
) => {
  const user = await getUserData()
  let server: Server
  // Upload to S3


  // Get Link from Bucket

  // Create Server
  try {
    server = await prisma.server.create({
      data: {
        name,
        profilePicture: "",
        members: {
          create: {
            user: {
              connect: {
                email: user.email
              }
            }
          }
        }
      }
    })
  } catch (error) {
    console.log(error)
    return "Unknown Prisma Error"
  }

  // If successfull
  redirect(`/app/server/${server.id}`)

}