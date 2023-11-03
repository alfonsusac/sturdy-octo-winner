"use client"

import { cn } from '@/lib/tailwind'
import * as Dialog from '@radix-ui/react-dialog'
import { useEffect, useState } from 'react'

export namespace Modal {
  export function Base(p: {
    trigger: React.ReactNode
    children: React.ReactNode
    className?: {
      overlay?: string,
      content?: string,
    },
    onCloseTransitionStart?: () => void,
    onOpenTransitionStart?: () => void,
    onOpen?: () => void,
  }) {
    const [open, setOpen] = useState(false)
    const [transition, setTransition] = useState(false)

    const handleOpenChange = (open: boolean) => {
      if (open) {
        setOpen(true)
        p.onOpen?.()
      }
      if (!open) {
        setTransition(false)
        p.onCloseTransitionStart?.()
        setTimeout(() => setOpen(false), 200)
      }
    }
    useEffect(() => {
      if (open) {
        setTransition(true)
        p.onOpenTransitionStart?.()
      }
    }, [open, p])

    return (
      <Dialog.Root open={ open } onOpenChange={ handleOpenChange }>
        <Dialog.Trigger asChild>
          { p.trigger }
        </Dialog.Trigger>
        <Dialog.Portal>
          <Dialog.Overlay
            className={ cn(
              "fixed inset-0",
              "bg-black",

              "transition-all duration-300",
              "opacity-0",
              "data-[state-transition=false]:opacity-0",
              "data-[state-transition=true]:opacity-70",

              p.className?.overlay,
            ) }
            data-state-transition={ transition }
          />

          <Dialog.Content
            className={ cn(
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
              "opacity-0",
              "data-[state-transition=false]:opacity-0",
              "data-[state-transition=true]:opacity-100",
              "scale-0",
              "data-[state-transition=true]:scale-100",

              // "focus:outline-indigo-600",
              "outline-indigo-600",

              p.className?.content
            ) }
            data-state-transition={ transition }
          >
            { open && p.children }
          </Dialog.Content>

        </Dialog.Portal>
      </Dialog.Root>
    )
  }



  export function Title({ className, ...p }: Dialog.DialogTitleProps) {
    return (
      <Dialog.Title
        className={ cn("text-lg my-2 font-semibold", className) }
        { ...p }
      />
    )
  }


  export function Description({ className, ...p }: Dialog.DialogDescriptionProps) {
    return (
      <Dialog.Description
        className={ cn("text-indigo-300/50", className) }
        { ...p }
      />
    )
  }
}


