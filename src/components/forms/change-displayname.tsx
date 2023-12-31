"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { FieldSet, Form } from "../base/form"
import { FormLabel } from "../base/form-field"
import { Input } from "../base/input"
import { FormControl } from "@radix-ui/react-form"
import ChangeDisplayname from "./change-displayname-action"
import { useSession } from "@/lib/auth/next-auth.client"
import updateDisplayname from "@/actions/session/update-dname-action"

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
    } catch (error) {
    }
  }

  return (
    <Form { ...form } onSubmit={ onSubmit }>
      <FieldSet name="displayname" render={
        ({ field }) => <>
          <FormLabel>Display Name</FormLabel>
          <Input { ...field } />
        </>
      } />
      {
        form.formState.isSubmitting ? "Loading..." :
        <button type="submit" className="text-xs bg-indigo-600 h-7 py-0 px-6 mt-2 font-medium rounded-sm"
          disabled={ !form.formState.isDirty }>Save</button>
      }
      {/* <input id="displayname" { ...form.register("displayname", { required: "This field is required" }) } /> */ }
    </Form>
  )

}