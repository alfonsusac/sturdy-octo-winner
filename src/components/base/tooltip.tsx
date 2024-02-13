"use client"

import { cn } from "@/lib/shared/tailwind"
import { Tooltip, TooltipArrow, TooltipContent, TooltipPortal, TooltipProvider, TooltipTrigger } from "@radix-ui/react-tooltip"
import { ReactNode } from "react"

export function TooltipBase(
  props: {
    content: ReactNode,
    children?: ReactNode,
    delayDuration?: number,
    skipDelayDuration?: number
    side?: "top" | "right" | "bottom" | "left"
  }
) {


  return (
    <TooltipProvider
      delayDuration={ props?.delayDuration ?? 0 }
      skipDelayDuration={ props.skipDelayDuration ?? 0 }
    >
      <Tooltip>
        <TooltipTrigger asChild>
          { props.children }
        </TooltipTrigger>
        <TooltipPortal>
          <TooltipContent className={ cn(
            "data-[state=delayed-open]:data-[side=top]:animate-slideDownAndFade",
            "data-[state=delayed-open]:data-[side=right]:animate-slideLeftAndFade",
            "data-[state=delayed-open]:data-[side=left]:animate-slideRightAndFade",
            "data-[state=delayed-open]:data-[side=bottom]:animate-slideUpAndFade",
            "select-none rounded-[4px] px-3 py-2 text-[15px] leading-none shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] will-change-[transform,opacity]",
            "bg-black text-white",
            "text-xs"
          ) }
            sideOffset={ 5 }
            side={ props.side ?? "top"}
          >
            <TooltipArrow />
            { props.content }
          </TooltipContent>
        </TooltipPortal>
      </Tooltip>
    </TooltipProvider>
  )
}