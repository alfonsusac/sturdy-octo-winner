import { ComponentProps, forwardRef } from "react"
import { FormControl, useFormField } from "./form"
import { cn } from "@/lib/tailwind"

// export function Input() {
//   const { } = useFormField()
//   return (
//     <FormControl>
//       <input />
//     </FormControl>
//   )

// }

export const Input = forwardRef<
  HTMLInputElement,
  ComponentProps<"input">
>(
  function Input({ className, ...props }, ref) {
    const { } = useFormField()
    return (
      <FormControl>
        <input className={ cn(
          "flex h-9 w-full rounded-sm bg-black/10 px-3"
          , className
        ) } { ...props } />
      </FormControl>
    )
  }
)