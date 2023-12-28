import { JWTofRegisteredUser } from "@/types/next-auth"
import { JWT } from "next-auth/jwt"

export type JWTUpdateParam = {
  purpose: string
  data: Partial<Omit<JWTofRegisteredUser, 'sub'>>
}


export async function registerUserHandler(param: JWTUpdateParam, previousToken: JWT) {
  const { name, username, email, picture, provider, userid } = param.data
  if (!name || !username || !email || !picture || !provider || !userid) {
    throw new Error('Data not complete! Can\'t register')
  }
  return {
    ...previousToken,
    name: name,
    username: username,
    email: email,
    picture: picture,
    provider: provider,
    userid: userid,
  } satisfies JWTofRegisteredUser
}