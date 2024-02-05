import { ZodObject } from "zod"
import * as z from "zod"
import { UseFormProps, useForm as RHFuseForm, UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"



export function useZodForm<
  Schema extends z.ZodRawShape,
>(
  props: {
    schema: Schema,
    onSubmit?: (data: z.infer<ZodObject<Schema>>) => Promise<void>,
    onError?: (error: any) => void
  } & UseFormProps<z.infer<ZodObject<Schema>>>
) {
  const {schema, onSubmit, ...rhfProps } = props

  // Hook
  const form = RHFuseForm({
    resolver: zodResolver(z.object(schema)),
    mode: "onChange", // Default
    ...rhfProps
  });
  

  (form as any).onSubmit = async (data: z.infer<ZodObject<Schema>>) => {
    try {
      await onSubmit?.(data)
    } catch (error: any) {
      if (props.onError) {
        props.onError?.(error)
      } else {
        console.error(error)
        console.log("Error in zod form with schema:", schema)
      }
    }
  }

  const res = form

  return res as typeof form & {
    onSubmit: (data: z.infer<ZodObject<Schema>>) => void
  } 
}
