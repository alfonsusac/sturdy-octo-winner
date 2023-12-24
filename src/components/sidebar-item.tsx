"use client"

import { cn } from "@/lib/tailwind"
import { style } from "@/style"
import { usePathname } from "next/navigation"
import { ReactNode, forwardRef } from "react"
import { URLPattern } from "urlpattern-polyfill/urlpattern"
import { useActivePath } from "./lib/use-active-path"

//   - [SidebarItem]: forwardRef'd sidebarItem of sidebar
export const SidebarItem = forwardRef<HTMLButtonElement, {
  label: React.ReactNode
  urlpattern?: string
  className?: string
  children?: ReactNode
}>(function SidebarItem({ label, urlpattern, className, ...rest }, ref) {

  const selected = useActivePath(urlpattern ?? "")

  return (
    <button
      data-state={ selected ? "active" : "" }
      ref={ ref }
      className={ cn(
        "w-auto aspect-square rounded-xl flex flex-row justify-center items-center text-lg p-0",
        style.buttonListItem,
        className,
      ) }
      { ...rest }
    />
  )
})
