import { cn } from "@/lib/tailwind"
import { Label } from "@radix-ui/react-label"
import { ComponentProps, ComponentPropsWithoutRef, ElementRef, Ref, createContext, forwardRef } from "react"
import { useFormField } from "./form"

export const FormLabel = forwardRef(function FormLabel(
  { className, ...prop }: ComponentPropsWithoutRef<typeof Label>,
  ref: Ref<HTMLLabelElement>
) {
  const { error, formItemId } = useFormField()
  return (
    <Label ref={ ref } htmlFor={ formItemId }
      className={ cn(
        "block text-[0.65rem] uppercase font-semibold opacity-80",
        error && "text-destructive",
        className
      ) }
      { ...prop }
    >
      { prop.children }
    </Label>
  )
})