import { authOption } from "@/lib/auth/auth-setup"
import NextAuth from "next-auth"

const handler = NextAuth(authOption)

export { handler as GET, handler as POST }