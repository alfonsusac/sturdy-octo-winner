import { JWTofRegisteredUser } from "@/types/next-auth"
import { JWT } from "next-auth/jwt"
import { zfd } from "zod-form-data"

export type JWTUpdateParam = {
  purpose: "register"
  data: Omit<JWTofRegisteredUser, 'sub'>
}


export async function registerUserHandler(param: JWTUpdateParam, previousToken: JWT) {
  return {
    ...previousToken,
    name: param.data.name,
    username: param.data.username,
    email: param.data.email,
    picture: param.data.picture,
    provider: param.data.provider,
    userid: param.data.userid,
  } satisfies JWTofRegisteredUser
}