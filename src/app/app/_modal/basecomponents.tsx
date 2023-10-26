import { cn } from '@/lib/tailwind'
import * as Dialog from '@radix-ui/react-dialog'

export function ModalTitle({className,...p}: Dialog.DialogTitleProps){
  return (
    <Dialog.Title
      className={ cn("text-lg my-2 font-semibold", className) }
      { ...p }
    />
  )
}


export function ModalDescription({ className, ...p }: Dialog.DialogDescriptionProps) {
  return (
    <Dialog.Description
      className={ cn("text-indigo-300/50", className) }
      { ...p }
    />
  )
}
