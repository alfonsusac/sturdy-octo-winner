import { AppLogo } from '@/components/logo'
import { cn } from '@/lib/shared/tailwind'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen w-full max-w-screen-lg mx-auto">
      <header className="p-8 flex items-center justify-between">
        <AppLogo className="text-xl " />
        <a className={ cn(
          "py-1.5 px-5 text-black rounded-lg text-sm",
          "transition-all",
          "duration-100",
          "bg-white",
          "hover:bg-white/80",
          "shadow-lg",
          "font-semibold",
          "shadow-white/10",
          "hover:shadow-white/5",
        ) }
          href="/auth"
        >
          Login
        </a>
      </header>

      <div className="text-center f-col items-center m-8">
        <h1 className="
        mt-8 text-7xl font-bold
        text-transparent bg-clip-text 
        bg-gradient-to-tr from-white/60 via-white to-white
        max-w-xl
        ">
          Yet Another Discord Clone
        </h1>
        <p className="mt-4 max-w-md text-xl">
          A free text chat app that&apos;s is used to talk and hang out with friends and communities.
        </p>
        <div className="mt-12 f-row items-center gap-2">
          <a className={ cn(
            "py-2.5 min-w-[20rem] text-white font-medium rounded-lg transition-all duration-100",
            "bg-indigo-500/80 hover:bg-indigo-500/70",
            "shadow-2xl sshadow-indigo-500/80 hover:shadow-indigo-500/50",
          ) }
            href="/auth"
          >
            Join Now
          </a>
        </div>
      </div>
    </main>
  )
}

