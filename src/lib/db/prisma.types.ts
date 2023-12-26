import { Account, User } from "@prisma/client"

export type UserWithAccount = User & {
  accounts: Account[]
}