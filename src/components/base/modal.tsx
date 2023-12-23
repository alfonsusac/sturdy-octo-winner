"use client"

import { cn } from '@/lib/tailwind'
import * as Dialog from '@radix-ui/react-dialog'
import { ReactNode, useEffect, useState } from "react"

/**
  Modal Base Component

  - On open, sets transition to true, wait for 200ms, sets transition to false
  
 
 */

function useCloseAnimation(duration = 200, onChange?:(open?:boolean)=>void) {
  const [isVisible, setVisible] = useState(false)
  const [isOpen, setOpen] = useState(false)

  // Callbacks
  const handleOpenChange = (open: boolean) => {
    if (open) {
      setVisible(true)
      onChange?.(true)
    }
    if (!open) {
      setOpen(false)
      onChange?.(false)
      setTimeout(() => setVisible(false), duration)
    }
  }

  useEffect(() => {
    if (isVisible) {
      setOpen(true)
    }
  }, [isVisible])

  return { isVisible, isOpen, handleOpenChange }
}

export function ModalBase(p: {
  trigger?: React.ReactNode
  children?: React.ReactNode
  className?: {
    overlay?: string,
    content?: string,
  },
  onChange?: (open?: boolean) => void,
}) {
  const { isVisible, isOpen, handleOpenChange } = useCloseAnimation(200, p.onChange)
  return <Dialog.Root open={ isVisible } onOpenChange={ handleOpenChange }>
    <Dialog.Trigger asChild>{ p.trigger }</Dialog.Trigger>
    <Dialog.Portal>
      <Overlay isOpen={ isOpen } className={ p.className?.overlay } />
      <Content isOpen={ isOpen } className={ p.className?.content }>
        { p.children }
      </Content>
    </Dialog.Portal>
  </Dialog.Root>

}

function Overlay(p: { className?: string, isOpen?: boolean }) {
  return <Dialog.Overlay data-state-transition={ p.isOpen } className={ cn(
    "fixed inset-0 bg-black",
    "transition-all duration-300",
    "opacity-0",
    "data-[state-transition=true]:opacity-70",
    p?.className,
  ) } />
}

function Content(p: { className?: string, isOpen?: boolean, children: ReactNode }) {
  return <Dialog.Content data-state-transition={ p.isOpen } className={ cn(
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
  ) }>{ p.children }</Dialog.Content>
}