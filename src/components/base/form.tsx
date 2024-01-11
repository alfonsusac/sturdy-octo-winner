import { cn } from "@/lib/tailwind"
import { Slot } from "@radix-ui/react-slot"
import { ComponentProps, ComponentPropsWithoutRef, ElementRef, ReactElement, ReactNode, Ref, createContext, forwardRef, useContext, useId } from "react"
import { ControllerProps, FieldValues as FVs, FieldPath as FP, FormProvider, SubmitHandler, UseFormReturn, Controller, useFormContext } from "react-hook-form"
import { Label as RadixLabel } from "@radix-ui/react-label"

//  ● Form 
//   distributes form status to child component
//   <Form {...form} onSubmit={() => {}}>
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



//  ● Form Field
//   distributes name of field (or any information) to child component
//
const FormFieldContext = createContext<
  { name: string }
>(
  {} as any
)

export function FieldSet<
  TFVs extends FVs = FVs,
  TN extends FP<TFVs> = FP<TFVs>,
>(
  props: ControllerProps<TFVs, TN>
) {
  return (
    <FormFieldContext.Provider value={ { name: props.name } }>
      <FormItem>
        <Controller { ...props } />
      </FormItem>
    </FormFieldContext.Provider>
  )
}

export function Fieldset(
  prop: {
    name: string,
    children: ReactNode
    className?: string
  }
) {
  return (
    <FormFieldContext.Provider value={ { name: prop.name } }>
      <FormItem className={ prop.className }>
        { prop.children }
      </FormItem>
    </FormFieldContext.Provider>
  )
}

//  ※ Form Item
//   distributes unique ID via contet to whomever component needs it 
//   (like matching id of Label and Input)
//
const FormItemContext = createContext<{ id: string }>({} as any)
export const FormItem = forwardRef(
  function FormItem(
    props: ComponentProps<"div">,
    ref: Ref<HTMLDivElement>
  ) {
    const id = useId()
    return (
      <FormItemContext.Provider value={ { id } }>
        <div ref={ ref } className={ cn("space-y-2", props.className) } { ...props } />
      </FormItemContext.Provider>
    )
  }
)

//  ※ Form Control
//   provide necessary accessibiltiy attributes to child input component
//   (aria and stuff)
export const FormControl = forwardRef<
  ElementRef<typeof Slot>,
  ComponentPropsWithoutRef<typeof Slot>
>(
  function FormControl(
    props,
    ref,
  ) {
    const { error, formItemId, formDescriptionId, formMessageId } = useFormField()
    return (
      <Slot ref={ ref } id={ formItemId }
        aria-describedby={
          !error
            ? `${formDescriptionId}`
            : `${formDescriptionId} ${formMessageId}`
        }
        aria-invalid={ !!error }
        { ...props }
      />
    )
  }
)


export function useFormField() {
  const fieldContext = useContext(FormFieldContext)
  const itemContext = useContext(FormItemContext)
  const { getFieldState, formState, register } = useFormContext()

  const fieldState = getFieldState(fieldContext.name, formState)

  if (!fieldContext) {
    throw new Error("useFormField should be used within <FormField>")
  }

  const { id } = itemContext

  return {
    id,
    name: fieldContext.name,
    formItemId: `${id}-form-item`,
    formDescriptionId: `${id}-form-item-description`,
    formMessageId: `${id}-form-item-message`,
    ...fieldState,
    register: () => register(fieldContext.name),
    formState
  }
}

// ※※※ STUFF THAT USES [useFormField] ※※※

//  ※ Form Label
//   uses the form field hook to retrieve: [error state]. [id]

export const Label = forwardRef(
  function Label(
    props: ComponentPropsWithoutRef<typeof RadixLabel>,
    ref: Ref<HTMLLabelElement>
  ) {
    const { error, formItemId } = useFormField()
    const { className, children, ...rest } = props
    return <RadixLabel ref={ ref } htmlFor={ formItemId }
      className={ cn(error && "text-red-500", className) }
      { ...rest }
    >
      { children } {
        error?.message && <span className="normal-case font-medium italic"> - {
          error?.message
        }</span>
      }
    </RadixLabel>
  }
)

export const Input = forwardRef(
  function Input(
    props: ComponentPropsWithoutRef<"input">,
    ref: Ref<HTMLInputElement>
  ) {
    const { id, formItemId, error, formDescriptionId, formMessageId, register } = useFormField()

    return <input
      id={ formItemId }
      aria-describedby={
        !error
          ? `${formDescriptionId}`
          : `${formDescriptionId} ${formMessageId}`
      }
      aria-invalid={ !!error }
      autoComplete="off"
      { ...register() }
      { ...props }
    />
  }
)

export const Button = forwardRef(
  function Button(
    props: ComponentPropsWithoutRef<"button">,
    ref: Ref<HTMLButtonElement>
  ) {
    const { className, children, type, ...rest } = props
    const { formState, error } = useFormField()
    
    return <button
      ref={ ref }
      className={ cn(formState && "mt-3", className) }
      disabled={ formState.isSubmitting || !!error || !formState.isValid }
      type={ type ?? 'submit' }
      { ...rest }
    >
      {
        formState.isSubmitting ? "Loading..." : children
      }
    </button>
  }
)

export const Message = forwardRef(
  function Message(
    props: ComponentPropsWithoutRef<"div">,
    ref: Ref<HTMLDivElement>,
  ) {
    const { formState } = useFormField()
    return <div className="text-xs overflow-hidden h-6 opacity-60"
      { ...props }
    />
  }
)
