import { cn } from "@/lib/tailwind"
import { ComponentProps, ReactElement, ReactNode, Ref, createContext, forwardRef, useId } from "react"
import { ControllerProps, FieldValues as FVs, FieldPath as FP, FormProvider, SubmitHandler, UseFormReturn, Controller } from "react-hook-form"

export function Form<
  TFVs extends FVs = FVs
>(
  prop:
    & UseFormReturn<TFVs>
    & {
      onSubmit: SubmitHandler<TFVs>,
      children: ReactNode,
    },
) {
  const { onSubmit, children, ...providerProp } = prop
  return (
    <FormProvider { ...providerProp }>
      <form onSubmit={ prop.handleSubmit(onSubmit) }>
        { children }
      </form>
    </FormProvider>
  )
}

const FItemContext = createContext<{ id: string }>({} as any)

export const FormItem = forwardRef(
  function FormItem(
    props: ComponentProps<"div">,
    ref: Ref<HTMLDivElement>
  ) {
    const id = useId()
    return (
      <FItemContext.Provider value={ { id } }>
        <div ref={ ref } className={ cn("space-y-2", props.className) } { ...props } />
      </FItemContext.Provider>
    )
  }
)


const FFieldContext = createContext<{ name: string }>({} as any)

export function Field<
  TFVs extends FVs = FVs,
  TN extends FP<TFVs> = FP<TFVs>,
>(
  props: ControllerProps<TFVs, TN>
) {
  return (
    <FFieldContext.Provider value={ { name: props.name } }>
      <FormItem>
        <Controller { ...props } />
      </FormItem>
    </FFieldContext.Provider>
  )
}