"use server"

import { Auth } from "@/lib/auth/next-auth"
import { JoinServerInputs } from "../app/app/_form/join-server"

export async function joinServer(input: JoinServerInputs) {
  const { session } = await Auth.getSession() 
  console.log(input)
  return { result: "Server Joined" }
}