import { PrismaClient } from '@prisma/client'
import { createSingleton } from '../singleton'

export default createSingleton('prisma', () => {
  console.log("Creating New Prisma Client...")
  return new PrismaClient({
    errorFormat: 'pretty',
    log: ['info', 'warn', 'error'],
  })
})


// const prismaClientSingleton = () => {
//   console.log("Creating New Prisma Client...")
//   console.log("Prisma in globalThis?", 'prisma' in globalThis)
//   return new PrismaClient({
//     errorFormat: 'pretty',
//     // log: ['info', 'warn', 'error', 'query']
//     log: ['info', 'warn', 'error'],
//   })
// }
// type PrismaClientSingleton = ReturnType<typeof prismaClientSingleton>

// const globalForPrisma = globalThis as unknown as {
//   prisma: ReturnType<typeof prismaClientSingleton>
// }


// const prisma = globalForPrisma.prisma ?? prismaClientSingleton()


// if (process.env.NODE_ENV !== 'production') {
//   globalForPrisma.prisma = prisma
// }
