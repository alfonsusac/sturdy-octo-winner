import { AppLogo } from '@/components/logo'
import { cn } from '@/lib/tailwind'
import Image from 'next/image'

export default function Home() {
  return (
    <main className="min-h-screen w-full flex items-center justify-center">
      <div className={ cn(
        "text-center",
        "flex flex-col items-center",
        "m-8"
      ) }>
        
        <AppLogo className={ cn(
          "text-2xl",
          "drop-shadow-lg"
        ) } />

        <h1 className="mt-8 text-4xl font-bold text-white">
          Yet Another Discord Clone
        </h1>

        <p className="mt-4">
          A free text chat app that&apos;s is used to talk and hang out with friends and communities.
        </p>

        <div className="mt-8 flex flex-row items-center gap-2">
          <a className={ cn(
            "py-4 px-6 text-white rounded-lg",
            "cursor-pointer",
            "transition-all",
            "duration-100",
            "bg-indigo-500/80",
            "hover:bg-indigo-500/70",
            "shadow-2xl",
            // "hover:shadow-xl",
            "shadow-indigo-500/80",
            "hover:shadow-indigo-500/50",
          ) }
            href="/auth"
          >
            Sign Up Now
          </a>

          <span>
            or <a className="underline">
              login
            </a>
          </span>

        </div>

      </div>

      
    </main>
  )
}

