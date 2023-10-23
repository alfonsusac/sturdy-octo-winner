"use client"

import { cn } from "@/lib/tailwind"
import { usePathname } from "next/navigation"

export function HomeSidebarMenuItem(p: {
  icon: React.ReactNode
  label: React.ReactNode
  link: string
  strict: boolean
}) {
  const path = usePathname()

  return (
    <button className={ cn(
      "w-full rounded-md",
      "flex flex-row",
      "gap-2.5",
      "p-2",

      "text-indigo-200/40",
      "text-start",

      "hover:bg-indigo-300/10",
      "hover:text-indigo-200/60",

      "data-[selected=true]:text-indigo-100/80",
      "data-[selected=true]:bg-indigo-400/5",
      "data-[selected=true]:hover:bg-indigo-300/10",

      "active:text-indigo-200/90",
      "active:bg-indigo-300/20",

      "data-[selected=true]:active:text-indigo-100/90",
      "data-[selected=true]:active:bg-indigo-300/20",
    ) }
      data-selected={
        p.strict ? (p.link === path) : (path.startsWith(p.link))
      }
    >
      <div className="text-lg">
        { p.icon }
      </div>
      <div className="text-sm">
        { p.label }
      </div>
    </button>
  )
}