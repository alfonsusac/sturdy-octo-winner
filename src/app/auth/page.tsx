import { ButtonBase, LoginButton } from "@/components/ui/button"
import { LoginGoogleButton } from "@/components/ui/button.login"
import { Icon } from '@iconify/react'

export default function AuthPage() {
  return (
    <main className="min-h-screen w-full gap-8 flex flex-col items-center justify-center">
      <div className="max-w-sm w-full flex flex-col gap-8 items-center bg-indigo-300/5 p-8 rounded-3xl">
        <h1 className="text-3xl font-bold text-white">
          Log in
        </h1>
        <LoginGoogleButton secondary large block />
      </div>
    </main>
  )
}