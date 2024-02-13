/* eslint-disable @next/next/no-img-element */
"use client"

import { ComponentPropsWithoutRef, SVGProps } from "react"
import { useAvatarUpload } from "../api/use-avatar-upload"
import { cn } from "@/lib/shared/tailwind"
import { useFormContext } from "react-hook-form"

export function AvatarPicker(
  props: {
    className?: string,
    imgAlt?: string,
    fieldName?: string,
    imgProps?: ComponentPropsWithoutRef<"img">
    inputProps?: ComponentPropsWithoutRef<"input">
    iconProps?: ComponentPropsWithoutRef<"svg">
  } & Parameters<typeof useAvatarUpload>[0]
) {
  const form = useFormContext()

  const { getRootProps, getInputProps, preview, isLoading } = useAvatarUpload({
    onImageSelected(originalFile, resizedBlob) {
      if (props.fieldName) {
        form.setValue(props.fieldName, resizedBlob)
      }
    },
    ...props
  })
  
  const { className: iconClassName, ...iconProps } = props.iconProps ?? {}
  const { className: imgClassName, ...imgProps } = props.imgProps ?? {}
  

  return (
    <>
      <button
        {...getRootProps()}
        type="button"
        className={cn(
          "relative w-20 h-20 [&.p-0]:p-0 rounded-full overflow-hidden",
          "outline-dashed outline-2 outline-indigo-200/40",
          "hover:shadow-[0px_0px_0px_8px_#717AC233]",
          preview && "outline-none",
          isLoading && "pointer-events-none"
        )}
      >
        <img
          alt={props.imgAlt}
          src={preview ?? undefined}
          className={cn(
            "w-full h-full object-cover absolute inset-0 hidden",
            preview && "block", 
            isLoading && "blur-sm",
            imgClassName
          )}
          {...imgProps}
        />
        <IcRoundAddPhotoAlternate
          className={cn(
            "mx-auto w-full h-full max-h-14 max-w-14 p-[15%] text-indigo-200/80",
            iconClassName
          )}
          {...iconProps}
        />
      </button>
      <input
        className="hidden"
        {...props.inputProps}
        {...getInputProps()}
      />
    </>
  )
}

export function IcRoundAddPhotoAlternate(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" {...props}><path fill="currentColor" d="M21.02 5H19V2.98c0-.54-.44-.98-.98-.98h-.03c-.55 0-.99.44-.99.98V5h-2.01c-.54 0-.98.44-.99.98v.03c0 .55.44.99.99.99H17v2.01c0 .54.44.99.99.98h.03c.54 0 .98-.44.98-.98V7h2.02c.54 0 .98-.44.98-.98v-.04c0-.54-.44-.98-.98-.98M16 9.01V8h-1.01c-.53 0-1.03-.21-1.41-.58c-.37-.38-.58-.88-.58-1.44c0-.36.1-.69.27-.98H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8.28c-.3.17-.64.28-1.02.28A2 2 0 0 1 16 9.01M15.96 19H6a.5.5 0 0 1-.4-.8l1.98-2.63c.21-.28.62-.26.82.02L10 18l2.61-3.48c.2-.26.59-.27.79-.01l2.95 3.68c.26.33.03.81-.39.81"></path></svg>
  )
}