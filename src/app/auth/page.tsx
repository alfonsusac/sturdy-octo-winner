import { ButtonBase, LoginButton } from "@/components/button"
import { LoginGoogleButton } from "@/components/button.login"
import { Icon } from '@iconify/react'

export default function AuthPage() {
  return (
    <main className="min-h-screen w-full gap-8 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold text-white">
        Log in
      </h1>
      <div className="max-w-xs w-full">
        <LoginGoogleButton secondary large block />
      </div>
    </main>
  )
}