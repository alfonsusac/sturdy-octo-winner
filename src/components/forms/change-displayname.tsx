"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { Button, FieldSet, Fieldset, Form, Input, Label } from "../base/form"
import { FormLabel } from "../base/form-field"
import { useSession } from "@/lib/auth/next-auth.client"
import updateDisplayname from "@/actions/session/update-dname-action"
import { toast } from "sonner"

type Inputs = {
  displayname: string
}

export default function ChangeDisplaynameForm() {

  const session = useSession()

  const form = useForm<Inputs>({
    defaultValues: {
      displayname: session.data?.user.name ?? ""
    },
  })

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await session.update("update-displayname", async () => await updateDisplayname(data))
      form.reset({
        displayname: data.displayname
      })
      toast.success("Displayname updated!")
    } catch (error) {
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