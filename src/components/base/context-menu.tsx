"use client"

import { ContextMenu, ContextMenuContent, ContextMenuPortal, ContextMenuTrigger } from "@radix-ui/react-context-menu"
import { ReactNode } from "react"

export function ContextMenuBase(
  props: {
    trigger: ReactNode
    children: ReactNode
  }
) {
  
  return (
    <ContextMenu>
      <ContextMenuTrigger>{ props.trigger }</ContextMenuTrigger>
      <ContextMenuPortal>
        <ContextMenuContent
          className="min-w-[220px] bg-white rounded-md overflow-hidden p-[5px] shadow-[0px_10px_38px_-10px_rgba(22,_23,_24,_0.35),_0px_10px_20px_-15px_rgba(22,_23,_24,_0.2)]"
        >
          { props.children }
        </ContextMenuContent>
      </ContextMenuPortal>
    </ContextMenu>
  )
}