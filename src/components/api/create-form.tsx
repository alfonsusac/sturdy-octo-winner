import { ZodObject } from "zod"
import * as z from "zod"
import { UseFormProps, useForm as RHFuseForm, UseFormReturn } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"



export function useZodForm<
  Schema extends z.ZodRawShape,
>(
  props: {
    schema: Schema,
    onSubmit?: (data: z.infer<ZodObject<Schema>>) => void
  } & UseFormProps<z.infer<ZodObject<Schema>>>
) {
  const {schema, onSubmit, ...rhfProps } = props

  // Hook
  const form = RHFuseForm({
    resolver: zodResolver(z.object(schema)),
    mode: "onChange",
    ...rhfProps
  });
  

  (form as any).onSubmit = onSubmit

  const res = form

  return res as typeof form & {
    onSubmit: (data: z.infer<ZodObject<Schema>>) => void
  } 
}



// const form = useZodForm({
//   schema: {
//     guildName: z.string().min(1).max(64),
//     guildPicture: z.instanceof(Blob).optional()
//   },
//   onSubmit(data) {
    
//   },
//   defaultValues: {
    
//   },
//   mode: "onChange"
// })