"use client"

import { cn } from '@/lib/tailwind'
import { style } from '@/style'
import * as Dialog from '@radix-ui/react-dialog'
import { CSSProperties, ReactNode, Ref, SVGProps, forwardRef, useEffect, useState } from "react"

/**
 
 ※ Modal Base Component
  
  onOpen:
  - sets isVisible to true, then as a side effect of useEffect,
  - isOpen is also set to true after a frame
  - then data-[state-transition] selector will trigger its transition

  onClose:
  - On close, isOpen is set to false, a 200s timer is also set to set isVisible to false (later)
  - data-[state-transition] selector will trigger its transition back to [original state]
  - but only 200s later, the component will be fully unmounted.

  component using this:
  - [dialog]: a pop up box prompting to talk to user
  - [settings]: a page that covers the entire page for settings menu

  style:
  - by default it looks like a dialog. Can be overriden
 
 */

function useCloseAnimation(duration = 200, onChange?: (open?: boolean) => void) {
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
  style?: {
    content?: CSSProperties,
  }
  onChange?: (open?: boolean) => void,
  contentRef?: Ref<HTMLDivElement>,
  open?: boolean,
  onOpenChange?: (open: boolean) => void
}) {
  const { isVisible, isOpen, handleOpenChange } = useCloseAnimation(200, p.onChange)
  useEffect(() => {
    if (p.open !== undefined) {
      handleOpenChange(p.open)
    }
  }, [p.open, handleOpenChange])
  return <Dialog.Root open={ isVisible } onOpenChange={ (open) => {
    handleOpenChange(open)
    p.onOpenChange?.(open)
  } }>
    <Dialog.Trigger asChild>{ p.trigger }</Dialog.Trigger>
    <Dialog.Portal>
      <Overlay isOpen={ isOpen } className={ p.className?.overlay } />
      <Content isOpen={ isOpen } className={ p.className?.content } ref={ p.contentRef } style={ p.style?.content }>
        { p.children }
      </Content>
    </Dialog.Portal>
  </Dialog.Root>

}
export function CloseModalButton() {
  return (
    <Dialog.Close asChild className={ cn("absolute top-4 right-4 p-2 rounded-lg z-10", style.buttonListItem) }>
      <button><FluentDismiss12Filled /></button>
    </Dialog.Close>
  )
}
export function FluentDismiss12Filled(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 12 12" { ...props }><path fill="currentColor" d="m1.897 2.054l.073-.084a.75.75 0 0 1 .976-.073l.084.073L6 4.939l2.97-2.97a.75.75 0 1 1 1.06 1.061L7.061 6l2.97 2.97a.75.75 0 0 1 .072.976l-.073.084a.75.75 0 0 1-.976.073l-.084-.073L6 7.061l-2.97 2.97A.75.75 0 1 1 1.97 8.97L4.939 6l-2.97-2.97a.75.75 0 0 1-.072-.976l.073-.084l-.073.084Z"></path></svg>
  )
}





const Overlay = forwardRef(function Overlay(p: { className?: string, isOpen?: boolean }, ref: Ref<HTMLDivElement>) {
  return <Dialog.Overlay data-state-transition={ p.isOpen } className={ cn(
    "fixed inset-0 bg-black",
    "transition-all duration-300",
    "opacity-0",
    "data-[state-transition=true]:opacity-70",
    p?.className,
  ) }
    ref={ ref }
  />
})

const Content = forwardRef(function Content(p: { className?: string, isOpen?: boolean, children: ReactNode, style?: CSSProperties }, ref: Ref<HTMLDivElement>) {
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
  ) } ref={ ref } style={ p.style }>{ p.children }</Dialog.Content>
})

