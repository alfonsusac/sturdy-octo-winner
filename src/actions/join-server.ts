"use server"

import { Auth } from "@/lib/auth/auth-setup"
import { JoinServerInputs } from "../components/forms/join-server"

export async function joinServer(input: JoinServerInputs) {
  const { session } = await Auth.getUserSession() 
  console.log(input)
  return { result: "Server Joined" }
}