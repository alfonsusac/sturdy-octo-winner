"use client"

import { cn } from '@/lib/tailwind'
import * as Dialog from '@radix-ui/react-dialog'
import { useEffect, useState } from "react"

/**
  Modal Base Component

  - On open, sets transition to true, wait for 200ms, sets transition to false
  
 
 */

export function ModalBase(p: {
  trigger: React.ReactNode
  children: React.ReactNode
  className?: {
    overlay?: string,
    content?: string,
  },
  onClose?: () => void,
  onOpen?: () => void,
}) {
  // States
  const [visible, setVisible] = useState(false)
  const [open, setOpen] = useState(false)
  // Callbacks
  
  const handleOpenChange = (open: boolean) => {
    if (open) {
      setVisible(true)
      p.onOpen?.()
    }
    if (!open) {
      setOpen(false)
      p.onClose?.()
      setTimeout(() => setVisible(false), 200)
    }
  }

  // Effects


  useEffect(() => {
    if (visible) {
      setOpen(true)
    }
  }, [visible])
  
  return <Dialog.Root open={ visible } onOpenChange={ handleOpenChange }>
    <Dialog.Trigger asChild>{ p.trigger }</Dialog.Trigger>
    <Dialog.Portal>
      <DialogOverlay isOpen={open} className={p.className?.overlay} />
      <Dialog.Content data-state-transition={ open } className={ cn(
          "fixed",

          "focus:outline-none",
          "bg-[#272B3C]",
          "flex flex-row justify-center items-stretch",

          "w-full",
          "max-w-sm",
          "text-sm",
          "rounded-2xl",
          "overflow-clip",

          // Center
          "top-1/2 -translate-y-1/2",
          "left-1/2 -translate-x-1/2",

          //Transition
          "transition-all duration-300",
          // initial state
          "opacity-0",
          "scale-0",
          // open state
          "data-[state-transition=true]:opacity-100",
          "data-[state-transition=true]:scale-100",

          // "focus:outline-indigo-600",
          "outline-indigo-600",

          p.className?.content
        ) }
      >
        { visible && p.children }
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>

}

function DialogOverlay(p: { className?: string, isOpen?: boolean }) {
  return <Dialog.Overlay data-state-transition={ p.isOpen }  className={ cn(
      "fixed inset-0",
      // "bg-red-500",
      "bg-black",
      "transition-all duration-300",
      "opacity-0",
      "data-[state-transition=true]:opacity-70",
      p?.className,
    ) }
  />
}