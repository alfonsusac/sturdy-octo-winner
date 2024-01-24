"use client"

import { useActivePath } from "@/components/api/use-active-path"
import { cn } from "@/lib/tailwind"
import { style } from "@/style"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function HomeSidebarMenuItem(
  props: {
    icon: React.ReactNode
    label: React.ReactNode
    pattern: string
    link: string
  }
) {
  const selected = useActivePath(props.pattern)

  return (
    <Link className={ cn(
      "w-full rounded-md flex flex-row",
      "gap-2.5 p-2",

      "text-start",
      "text-indigo-200/40",

      "hover:bg-indigo-300/10",
      "hover:text-indigo-200/60",

      style.buttonListItem,
    ) }
      data-state={ selected ? "active" : ""}
      href={ props.link }
    >
      <div className="text-lg">
        { props.icon }
      </div>
      <div className="text-sm">
        { props.label }
      </div>
    </Link>
  )
}