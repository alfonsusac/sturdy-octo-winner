"use server"

import { Auth } from "@/lib/auth/auth-setup"

export async function ChangeDisplayname(
  data: {
    displayname: string,
  },
) {
  const session = await Auth.getUserSession()

}