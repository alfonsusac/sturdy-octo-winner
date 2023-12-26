import { Account } from "next-auth"
import prisma from "../db/prisma"
import { AcccountProvider } from "@prisma/client"
import { JWT } from "next-auth/jwt"
import { JWTofRegisteredUser } from "@/types/next-auth"

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