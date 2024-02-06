import { PrismaClient } from "@prisma/client"
import { createSingleton } from "./singleton"


export const prisma = createSingleton('prisma',
  () => new PrismaClient(
    {
      errorFormat: 'pretty',
      log: ['info', 'warn', 'error'],
    }
  )
)

