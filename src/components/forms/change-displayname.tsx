"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { Button, FieldSet, Fieldset, Form, Input, Label } from "../base/form"
import s_updateDisplayname from "@/actions/session/update-dname-action"
import { toast } from "sonner"
import { infer as i, object, string } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSession } from "@/lib/client/auth-hooks"

type Inputs = {
  displayname: string
}

export default function ChangeDisplaynameForm() {

  const session = useSession()

  const schema = object({
    displayname: string().refine(str => str !== session.name)
  })

  const form = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      displayname: session.name ?? ""
    },
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await session.update("update-displayname", async () => await s_updateDisplayname(data))
      form.reset({
        displayname: data.displayname
      })
      toast.success("Displayname updated!")
    } catch (error) {
      console.error(error)
      toast.error("Unknown Error")
    }
  }

  return (
    <Form { ...form } onSubmit={ onSubmit }>
      <Fieldset name="displayname">
        <Label>Display Name</Label>
        <Input />
      </Fieldset>
      <Button>Save</Button>
    </Form>
  )

}