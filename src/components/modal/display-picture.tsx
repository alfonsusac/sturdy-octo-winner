import { ReactNode } from "react"
import { ModalBase } from "../base/modal"
import { DialogBase, Title } from "../base/dialog"
import { style } from "@/style"
import { cn } from "@/lib/tailwind"
import { Form } from "../base/form"
import { useForm } from "react-hook-form"

export function SetDisplayPicture(
  p: {
    children?: ReactNode,
    onSubmit?: (link: string) => void
  }
) {
  const form = useForm({


  })

  function onSubmit(data: any) {

  }

  return (
    <DialogBase trigger={ p.children } className="">
      <Form { ...form } onSubmit={ onSubmit }>
        <div className="p-8">
          <Title>Upload an Image</Title>
          <div className="p-2 bg-[#1C1E2A] rounded-md">
            <input { ...form.register("picture", {
              required: "Recipe picture is required",
            }) }
              type="file"
              id="picture"
              className="bg-[#1C1E2A] text-transparent file:bg-transparent file:border-none file:text-transparent h-36 border-[3px] border-indigo-300/10 border-dashed after:block after:content-['Upload_an_Image'] relative after:absolute after:top-1/2 after:left-1/2 after:-translate-x-1/2 after:-translate-y-1/2 after:text-indigo-300/20"
            />
          </div>
        </div>
        <div className={ cn(style.dialogFooter) }>
          <button
            className={ cn(style.dialogButton) }
            // onClick={ p.toBack }
            type="button"
          >
            Back
          </button>
          <button
            className={ cn(style.dialogButton) }
            // disabled={ !formState.isValid }
            type="submit"
          >
            Create
          </button>
        </div>
      </Form>
    </DialogBase>
  )
}