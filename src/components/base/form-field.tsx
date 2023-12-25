import { cn } from "@/lib/tailwind"
import { ComponentProps, ElementRef, Ref, createContext, forwardRef } from "react"

export const FormLabel = forwardRef(function FormLabel(
  prop,
  ref: HTMLLabelElement
) {
  
  return (
    <label ref={ refs } />
  )
})