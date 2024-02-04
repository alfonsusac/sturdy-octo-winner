"use server"

import { Auth } from "@/lib/auth/auth-setup"

export async function joinGuild(input: any) {
  const { session } = await Auth.getUserSession() 
  console.log(input)
  return { result: "Guild Joined" }
}