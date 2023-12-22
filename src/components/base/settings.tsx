import { ReactNode } from "react"
import { ModalBase } from "./modal"
import { DialogContent } from "@radix-ui/react-dialog"
import { cn } from "@/lib/tailwind"

export function SettingsPage(p: {
  children?: ReactNode
  trigger?: ReactNode
}) {
  return <ModalBase trigger={ p.trigger } className={ {
    overlay: cn(
      "bg-[#212432]",
      "flex flex-row justify-center items-stretch",
      "sm:p-8",
      // Remove Center Offset
      "translate-x-0 translate-y-0",
      "inset-0",
      "max-w-none",
      "rounded-none",
      // Transition
      "transition-all duration-300",
      "opacity-0",
      "data-[state-transition=true]:opacity-100",
      "scale-110",
      "data-[state-transition=true]:scale-100",
    )
  } }>
    { p.children }
  </ModalBase>
}
