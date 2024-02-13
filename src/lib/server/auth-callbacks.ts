import { JWTofRegisteredUser } from "@/types/next-auth"
import { JWT } from "next-auth/jwt"
import { prisma } from "./prisma"
import { Account } from "next-auth"
import { AcccountProvider } from "@prisma/client"

export type JWTUpdateParam = {
  purpose: string
  data: Partial<Omit<JWTofRegisteredUser, 'sub'>>
}




export function onUpdateHandler(param: JWTUpdateParam, prevToken: JWT) {
  const { name, username, email, picture, provider, userid } = param.data
  console.log("On Update Handler...", param.data)
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




export async function getJWTfromOAuth(oauthAccount: Account, defaultToken: JWT) {
  const accountFromDB = await prisma.account.findUnique({
    where: {
      providerData: {
        providerAccountId: oauthAccount.providerAccountId,
        providerType: oauthAccount.provider as AcccountProvider
      }
    },
    include: { user: true }
  })
  if (accountFromDB) {
    return {
      ...defaultToken,
      name: accountFromDB.user.displayName,
      username: accountFromDB.user.username,
      email: accountFromDB.user.email,
      picture: accountFromDB.user.profilePicture,
      provider: accountFromDB.providerType,
      userid: accountFromDB.userId
    } satisfies JWTofRegisteredUser
  }
  else {
    return {
      ...defaultToken, // sub
      name: defaultToken.username,
      username: undefined!,
      email: defaultToken.email,
      picture: defaultToken.picture,
      provider: oauthAccount.provider,
    } satisfies JWT
  }
} 