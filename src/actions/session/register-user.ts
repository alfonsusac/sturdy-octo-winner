import { useSession } from "next-auth/react"
import { s_registerUserToDB } from "./register-user-action"
import { JWTUpdateParam } from "@/lib/auth/on-register"

export async function registerUser(data: FormData, session: ReturnType<typeof useSession>, event: {
  onError: (mes: string) => void,
  onSuccess: () => void
}) {
  const res = await s_registerUserToDB(data)
  if (res.error) { event.onError(res.error); return }
  if (!res.data) { event.onError(res.error ?? "Unknown Error"); return }
  await session.update({
    purpose: "register",
    data: {
      name: res.data.user.displayName,
      username: res.data.user.username,
      email: res.data.user.email,
      picture: res.data.user.profilePicture,
      userid: res.data.user.id,
      provider: res.data.provider,
    }
  } satisfies JWTUpdateParam)
  event.onSuccess()
}