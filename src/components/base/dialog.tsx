import { ReactNode } from "react"
import { ModalBase } from "./modal"
import { DialogContent } from "@radix-ui/react-dialog"
import { cn } from "@/lib/tailwind"
import * as Dialog from '@radix-ui/react-dialog'

/**
 
 ※ Dialog Base Component
  
  - Extends from the Dialog Component

 
 */

export function DialogBase(p: {
  children?: ReactNode
  trigger?: ReactNode
}) {
  return <ModalBase trigger={ p.trigger } className={ {
    overlay: cn("")
  }}>
      {p.children}
  </ModalBase>
}

export function Title({ className, ...p }: Dialog.DialogTitleProps) {
  return <Dialog.Title className={ cn("text-lg my-2 font-semibold", className) } { ...p } />
}

export function Description({ className, ...p }: Dialog.DialogDescriptionProps) {
  return <Dialog.Description className={ cn("text-indigo-300/50", className) } { ...p }/>
}

function Content(p: { className?: string, isOpen?: boolean, children?: ReactNode }) {
  return <DialogContent data-state-transition={ p.isOpen } className={ cn(
    "fixed outline-none",
    "top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2", //Center
    "w-full max-w-sm", // Default Size of Dialog
    "bg-[#272B3C]", // Default BG color
    "flex flex-row justify-center items-stretch", // Default Layout
    "text-sm",
    "rounded-2xl",
    "overflow-clip",
    // Transition
    "transition-all duration-300",
    //  initial state
    "opacity-0",
    "scale-0",
    //  open state
    "data-[state-transition=true]:opacity-100",
    "data-[state-transition=true]:scale-100",
    p.className
  ) }>{ p.children }</DialogContent>
}