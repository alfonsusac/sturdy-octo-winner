"use server"

import { Auth } from "@/lib/auth/auth-setup"
import { JoinGuildInputs } from "../components/forms/join-server"

export async function joinGuild(input: JoinGuildInputs) {
  const { session } = await Auth.getUserSession() 
  console.log(input)
  return { result: "Guild Joined" }
}