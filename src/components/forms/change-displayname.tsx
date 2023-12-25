"use client"

import { SubmitHandler, useForm } from "react-hook-form"
import { Field, Form } from "../base/form"

type Inputs = {
  displayname: string
}

export default function ChangeDisplaynameForm() {

  const form = useForm<Inputs>()
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    console.log(data)
  }

  return (
    <Form { ...form } onSubmit={ onSubmit }>
      <Field name="displayname" render={
        ({ field }) => <>
        
        </>
      } />
      <label htmlFor="displayname" className="block text-[0.65rem] uppercase font-semibold opacity-80">Display Name</label>
      <input id="displayname" { ...form.register("displayname", { required: "This field is required" }) } />
      <button type="submit">Submit</button>
    </Form>
  )

}