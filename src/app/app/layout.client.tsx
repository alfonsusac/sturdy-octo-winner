/* eslint-disable @next/next/no-img-element */
"use client"

import { useSession } from "@/lib/auth/next-auth.client"
import { cn } from "@/lib/tailwind"
import { Session } from "next-auth"
import { SessionProvider } from "next-auth/react"
import { usePathname } from "next/navigation"
import { ComponentProps, RefObject, SVGProps, createContext, forwardRef, useContext, useRef } from "react"
import UserSettingView from "./_settings/user"
import { style } from "@/style"
import { User } from "@prisma/client"

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

function useActivePath(pattern: string) {
  const path = usePathname()

  
}


interface Props {
  icon: React.ReactNode
  label: React.ReactNode
  link?: string | string[]
  strict?: boolean
  className?: string
}
export const SidebarItem = forwardRef<HTMLButtonElement, Props>(function SidebarItem(p: {
  icon: React.ReactNode
  label: React.ReactNode
  link?: string | string[]
  strict?: boolean
  className?: string
}, ref) {

  const { icon, label, link, strict, className, ...rest } = p

  const path = usePathname()
  const selected = p.strict ? (
    typeof p.link === 'string' ? p.link === path : p.link?.includes(path)
  ) : (
    typeof p.link === 'string' ? path.startsWith(path) : p.link?.some(link => path.startsWith(link))
  )

  return (
    <button className={ cn(
      "w-auto aspect-square rounded-xl",
      "flex flex-row justify-center items-center",
      "text-lg",
      "p-0",
      style.buttonListItem,
      className,
    ) }
      data-state={ selected ? "active" : "" }
      { ...rest }
      ref={ref}
      title="Add New Server"
    >
      { p.icon }
    </button>
  )
})



export function UserStatus(p: {
  user: User
}) {
  const session = useSession()

  // console.log("Session Logging :)")
  // console.log(session)

  return (
    <div className={ cn(
      "bg-black/30",
      "h-12",
      "p-2.5",
      "rounded-b-lg",
      "flex flex-row gap-2",
      "items-center"
    ) }>
      <div className="h-full aspect-square rounded-full overflow-hidden bg-black/50">
        <img
          src={ session.data?.user?.image ?? "" }
          alt="Current user's profile picture"
        />
      </div>
      <div className={ cn(
        "flex flex-col gap-1 leading-[0.8] justify-center grow"
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
      <UserSettingView>
        <button className={ cn(
          "w-6 h-6 flex justify-center items-center",
          "rounded-md",
          "text-lg",
          "text-indigo-200/40",
          "hover:bg-indigo-400/10",
          "p-0",
        ) }>
          <FluentSettings28Filled className="text-lg" />
        </button>
      </UserSettingView>
    </div>
  )

}


export function FluentSettings28Filled(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 28 28" { ...props }><path fill="currentColor" d="M16.693 2.311A12.974 12.974 0 0 0 14.013 2c-.924.01-1.823.115-2.704.311a.923.923 0 0 0-.716.8l-.209 1.877a1.707 1.707 0 0 1-2.371 1.376l-1.72-.757a.92.92 0 0 0-1.043.214a12.059 12.059 0 0 0-2.709 4.667a.924.924 0 0 0 .334 1.017l1.527 1.125a1.701 1.701 0 0 1 0 2.74l-1.527 1.128a.924.924 0 0 0-.334 1.016a12.064 12.064 0 0 0 2.707 4.672a.92.92 0 0 0 1.043.215l1.728-.759a1.694 1.694 0 0 1 1.526.086c.466.27.777.745.838 1.281l.208 1.877a.923.923 0 0 0 .702.796a11.67 11.67 0 0 0 5.413 0a.923.923 0 0 0 .702-.796l.208-1.88a1.693 1.693 0 0 1 2.366-1.37l1.727.759a.92.92 0 0 0 1.043-.215a12.065 12.065 0 0 0 2.707-4.667a.924.924 0 0 0-.334-1.017L23.6 15.37a1.701 1.701 0 0 1-.001-2.74l1.525-1.127a.924.924 0 0 0 .333-1.016a12.057 12.057 0 0 0-2.708-4.667a.92.92 0 0 0-1.043-.214l-1.72.757a1.666 1.666 0 0 1-.68.144a1.701 1.701 0 0 1-1.688-1.518l-.21-1.879a.922.922 0 0 0-.714-.799ZM14 18a4 4 0 1 1 0-8a4 4 0 0 1 0 8Z"></path></svg>
  )
}


