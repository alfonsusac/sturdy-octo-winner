"use client"

import { cn } from "@/lib/tailwind"
import { DropdownMenu, DropdownMenuArrow, DropdownMenuContent, DropdownMenuItem, DropdownMenuPortal, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu"
import { ComponentProps, ReactNode } from "react"

export function DropdownBase(
  props: {
    trigger: ReactNode,
    children: ReactNode,
    className?: string,
    open?: boolean,
    onOpenChange?: (open: boolean) => void
  }
) {
  return (
    <DropdownMenu
      open={ props.open }
      onOpenChange={ props.onOpenChange }
    >
      <DropdownMenuTrigger asChild>
        { props.trigger }
      </DropdownMenuTrigger>
      <DropdownMenuPortal>
        <DropdownMenuContent
          className={ cn(
            "min-w-48 bg-black/80 rounded-md p-1 will-change-[opacity,transform]",
            "data-[side=top]:animate-slideDownAndFade",
            "data-[side=right]:animate-slideLeftAndFade",
            "data-[side=bottom]:animate-slideUpAndFade",
            "data-[side=left]:animate-slideRightAndFade",
            "shadow-md shadow-black/20 text-sm",
            props.className
          ) }>
          { props.children }
          <DropdownMenuArrow />
        </DropdownMenuContent>
      </DropdownMenuPortal>
    </DropdownMenu>
  )
}

export function DropdownItem(
  { className, ...rest }: ComponentProps<typeof DropdownMenuItem>
) {
  return (
    <DropdownMenuItem
      className={
        cn(
          "group relative",
          "flex items-center",
          "text-[0.8rem] leading-none h-[1.75rem] data-[disabled]:text-mauve8",
          "data-[disabled]:pointer-events-none data-[highlighted]:bg-indigo-800",
          "focus:outline-none",
          "cursor-pointer",
          "active:brightness-90",
          "flex flex-row gap-2",
          "p-2 rounded-[0.25rem] select-none outline-none",
          className
        )
      }
      { ...rest }
    />
  )
}