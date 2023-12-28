import { JWT } from "next-auth/jwt"
import { JWTUpdateParam } from "./on-register"
import { JWTofRegisteredUser } from "@/types/next-auth"

export function onUpdateHandler(param: JWTUpdateParam ,prevToken: JWT) {
  const { name, username, email, picture, provider, userid } = param.data
  return {
    ...prevToken,
    name: name ?? prevToken.name!,
    username: username ?? prevToken.username!,
    email: email ?? prevToken.email!,
    picture: picture ?? prevToken.picture!,
    provider: provider ?? prevToken.provider!,
    userid: userid ?? prevToken.userid!,
  } satisfies JWTofRegisteredUser
}