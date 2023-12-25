import { cn } from "@/lib/tailwind"
import { ComponentProps, Ref, createContext, forwardRef } from "react"






export const FormMessage = forwardRef(
  function FormMessage(p: ComponentProps<"p">, ref: Ref<HTMLParagraphElement>) {
    const formMessageId = ""

    return (
      <p ref={ ref } id={ formMessageId } className={ cn("", p.className) }
      >
      </p>
    )
  }
)
