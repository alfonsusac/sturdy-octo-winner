/* eslint-disable @next/next/no-img-element */
"use client"

import { useSession } from "@/lib/next-auth.client"
import { cn } from "@/lib/tailwind"
import { cardbg } from "@/style"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { usePathname } from "next/navigation"

export function Providers(p: {
  children: React.ReactNode
  session: Session | null
}) {
  return (
    <SessionProvider session={ p.session }>
      { p.children }
    </SessionProvider>
  )
}

export function SidebarItem(p: {
  icon: React.ReactNode
  label: React.ReactNode
  link: string
  strict: boolean
}) {
  const path = usePathname()

  return (
    <button className={ cn(
      "w-auto aspect-square rounded-xl",
      "flex flex-row justify-center items-center",

      "text-lg",
      "hover:bg-indigo-300/10",

      "data-[selected=true]:text-indigo-100/80",
      "data-[selected=true]:bg-indigo-300/5",
      "data-[selected=true]:hover:bg-indigo-300/10",
      // "m-2"
      "active:text-indigo-100/90",
      "active:bg-indigo-300/20",

      "data-[selected=true]:active:text-indigo-100/90",
      "data-[selected=true]:active:bg-indigo-300/20",
    ) }
      data-selected={
        p.strict ? (p.link === path) : (path.startsWith(p.link)) 
      }
    >
      {p.icon}
    </button>
  )
}



export function UserStatus() {
  const session = useSession()

  return (
    <div className={ cn(
      "bg-black/30",
      "h-12",
      "p-2.5",
      "rounded-b-lg",
      "flex flex-row gap-2",
    ) }>
      <div className="h-full aspect-square rounded-full overflow-hidden bg-black/50">
        <img
          src={ session.data?.user?.image ?? "" }
          alt="Current user's profile picture"
        />
      </div>
      <div className={ cn(
        "flex flex-col gap-1 leading-[0.8] justify-center"
      ) }>
        <div className={ cn(
          "text-[0.8rem] text-indigo-100/90",
          "font-semibold",
        )
        }>
          { session.data?.user?.name ?? "" }
        </div>
        <div className={ cn(
          "text-[0.7rem] text-indigo-100/60",
        ) }>
          status
        </div>
      </div>
    </div>
  )

}

