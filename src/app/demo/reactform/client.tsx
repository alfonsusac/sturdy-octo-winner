"use client"

import { Button, FieldSet, Fieldset, Form, Input, Label, Message } from "@/components/base/form"
import { sleep } from "@/lib/devutil"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFormState } from "react-dom"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const formSchema = z.object({
  favoriteFood: z.string().min(2).max(50),
})

export function TestForm() {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      favoriteFood: "",
    },
  })

  async function onSubmit(data: any) {
    // await sleep(500)
    toast.success("Favourite food successfully submittted.")
  }

  return (
    <Form { ...form } onSubmit={ onSubmit }>
      <Fieldset name="favoriteFood">
        <Label>Favorite Food</Label>
        <Message>Enter favorite food here.</Message>
        <div className="flex gap-2">
          <Input autoComplete='none' />
          <Button type="submit">Submit</Button>
        </div>
      </Fieldset>
    </Form>
  )
}

