"use server"

import { Auth } from "@/lib/auth/auth-setup"
import prisma from "@/lib/db/prisma"
import redirect from "@/lib/navigation"
import { AcccountProvider } from "@prisma/client"
import { zfd } from "zod-form-data"

const schema = zfd.formData({
  username: zfd.text(),
  displayname: zfd.text(),
  profilepicture: zfd.text(),
})

export async function registerUserToDB(formData: FormData) {
  try {
    const session = await Auth.getSession()
    if (!session.provider || !session.sub) redirect('/auth')

    //Validate user input

    const { username, displayname, profilepicture } = schema.parse(formData)

    // Create user
    const user = await prisma.user.create({
      data: {
        accounts: {
          create: {
            providerAccountId: session.sub,
            providerType: session.provider as AcccountProvider
          }
        },
        email: session.email!,
        username: username,
        displayName: displayname,
        profilePicture: profilepicture,
      },
    })

    return {
      error: undefined,
      success: true,
      data: {
        user,
        providerId: session.sub,
        provider: session.provider
      }
    }

  } catch (error: any) {
    console.log("Error Occured while registering user (Server Action)")
    console.error(error)
    return { error: "Error Occured", success: undefined }
  }
}