"use client"

// Image Cropper
// Credit to https://dninomiya.com/en/docs/image-cropper
// @Daichi Ninomiya

// S3 Setup
// https://vercel.com/templates/next.js/aws-s3-image-upload-nextjs
// @Vercel

// S3 Nodejs Tutorial
// https://www.youtube.com/watch?v=wbNyipJw9rI
// @TomDoesTech

// S3 Using Fetch API
// https://medium.com/@thewh1teagle/uploading-files-to-s3-using-fetch-api-9e8834310043
// @thewh1teangle

import { cn } from "@/lib/tailwind"
import Image from "next/image"
import { SVGProps, useEffect, useRef, useState } from "react"
import AvatarEditor from "react-avatar-editor"
import { useDropzone } from "react-dropzone"
import { Slider } from "../base/slider"
import { CloseModalButton, ModalBase } from "../base/modal"
import { Button, ModalFooter, Title } from "../base/dialog"
import { toast } from "sonner"
import { createCanvasFromResizedBase64 } from "@/lib/file"

export default function ImageCropper(
  {
    aspectRatio = 1, // Support multiple aspect ratio
    width,
    defaultValue,
    onCrop,
    onError,
    className
  }: {
    aspectRatio?: number
    width: number
    defaultValue?: string | null
    onCrop?: (value: { blob: Blob, url: string }) => Promise<void>
    onError?: (errors: string[]) => void
    className?: string
  }
) {
  const editor = useRef<AvatarEditor>(null)
  const [inputImage, setInputImage] = useState<File>()
  const [scale, setScale] = useState(1.0)
  const [open, setOpen] = useState(false)
  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    noKeyboard: true,
    multiple: false,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    onDropAccepted: (dropped) => {
      setInputImage(dropped[0])
      setScale(1.0)
      setOpen(true)
    },
    onDropRejected(fileRejections) {
      fileRejections.map(f => toast.error(f.errors.map(e => e.message).join('\n')))
    },
  })

  const [preview, setPreview] = useState<string>(defaultValue || "")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [toastID, setToastID] = useState<number | string>()

  async function cropImage(e: any) {
    e.preventDefault()
    setIsSubmitting(true)
    let toastID = toast("Uploading profile picture")
    setToastID(toastID)

    // The reason processCroppedImage() is not called here is because 
    //  somehow it lags popping up the `toast` above, therefore
    //  I decided to processCroppedImage on the next render cycle
    //
    // await delay(50) // so that the toast pops up instantly?
    // processCroppedImage().then(
    //   async (result) => {
    //     await onCrop?.(result)
    //     toast.success("Upload Success!!")
    //     setPreview(result.url)
    //     setOpen(false)
    //   }
    // ).catch(
    //   err => {
    //     console.log(err)
    //     onError?.(err)
    //     toast.error(err?.message ?? "Unknown Error")
    //   }
    // ).finally(
    //   () => {
    //     toast.dismiss(toastID)
    //     setIsSubmitting(false)
    //   }
    // )
  }

  const [isProcessing, setProcessing] = useState(false) // necessary to prevent trigger smh
  useEffect(() => {
    const processCroppedImage = async () => {
      const dataUrl = editor.current?.getImage()?.toDataURL("image/png")
      const resizedDataUrl = await createCanvasFromResizedBase64(dataUrl!, width)
      return resizedDataUrl
    }
    if (isSubmitting) {
      if (!isProcessing) {
        setProcessing(true) // Prevent double trigger lmao
        processCroppedImage().then(
          async (result) => {
            await onCrop?.(result)
            toast.success("Upload Success!!")
            setPreview(result.url)
            setOpen(false)
          }
        ).catch(
          err => {
            console.log(err)
            onError?.(err)
            toast.error(err?.message ?? "Unknown Error")
          }
        ).finally(
          () => {
            toast.dismiss(toastID)
            setProcessing(false)
            setIsSubmitting(false)
            setToastID(undefined)
          }
        )
      }
    }
  }, [isSubmitting, onCrop, onError, toastID, width, isProcessing])

  return (
    <div>
      <div
        className={ cn(
          "overflow-hidden cursor-pointer rounded-md grid place-content-center relative group",
          isDragAccept ? "border-primary" : "border-border",
          className,
        ) }
        style={ { aspectRatio } }
        { ...getRootProps() }
      >
        { !preview && (
          <MaterialSymbolsAddPhotoAlternateOutline className="w-10 h-10 stroke-1 text-muted-foreground opacity-40" />
        ) }
        { preview && (
          <Image unoptimized className="object-cover" fill src={ preview } alt="" />
        ) }
        <input { ...getInputProps() } className="hidden" />


        <div className="hidden group-hover:flex absolute inset-0 w-full h-full items-center justify-center bg-black/40 text-white/80">
          <IcBaselineModeEdit className="text-2xl" />
        </div>

      </div>

      <ModalBase open={ open } onOpenChange={ (status) => setOpen(status) } className={ {
        content: "flex flex-col gap-2"
      } }>
        <div className="pt-4">
          <CloseModalButton />
          <Title className="px-8">Edit Image</Title>
          <div className="mt-4 relative overflow-hidden" style={ { aspectRatio } }>
            { inputImage && (
              <AvatarEditor
                className={ cn("absolute max-w-full max-h-full inset-0", isSubmitting && "brightness-50") }
                scale={ scale }
                ref={ editor }
                width={ 1000 }
                height={ 1000 / aspectRatio }
                image={ inputImage }
                borderRadius={ 999 }
                border={ 100 }
              />
            ) }
          </div>
          <div className="mx-8 my-4 flex gap-4 text-4xl">
            <MaterialSymbolsPhotoSizeSelectSmall />
            <Slider min={ 1 } step={ 0.01 } max={ 2 }
              defaultValue={ [1] }
              onValueChange={ ([value]) => setScale(value) }
            />
            <MaterialSymbolsPhotoSizeSelectLarge />
          </div>
        </div>

        <ModalFooter>
          <Button onClick={ () => setOpen(false) } disabled={ isSubmitting }>Close</Button>
          <Button onClick={ cropImage } primary disabled={ isSubmitting }>Crop</Button>
        </ModalFooter>
      </ModalBase>
    </div>
  )
}



function MaterialSymbolsAddPhotoAlternateOutline(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" { ...props }><path fill="currentColor" d="M5 21q-.825 0-1.413-.588T3 19V5q0-.825.588-1.413T5 3h9v2H5v14h14v-9h2v9q0 .825-.588 1.413T19 21H5ZM17 9V7h-2V5h2V3h2v2h2v2h-2v2h-2ZM6 17h12l-3.75-5l-3 4L9 13l-3 4ZM5 5v14V5Z"></path></svg>
  )
}



function MaterialSymbolsPhotoSizeSelectSmall(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" { ...props }><path fill="currentColor" d="M13 21H5q-.825 0-1.412-.587T3 19v-8h10zm-9-2h8l-2.6-3.5L7.5 18l-1.4-1.85zM5 5H3q0-.825.588-1.412T5 3zm2 0V3h2v2zm4 0V3h2v2zm4 0V3h2v2zm0 16v-2h2v2zm4-16V3q.825 0 1.413.588T21 5zM3 9V7h2v2zm16 10h2q0 .825-.587 1.413T19 21zm0-2v-2h2v2zm0-4v-2h2v2zm0-4V7h2v2z"></path></svg>
  )
}

function MaterialSymbolsPhotoSizeSelectLarge(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" { ...props }><path fill="currentColor" d="M5 21q-.825 0-1.412-.587T3 19V7h14v14zm0-3h10l-3.4-4.5L9 17l-1.6-2.15zM5 5H3q0-.825.588-1.412T5 3zm2 0V3h2v2zm4 0V3h2v2zm4 0V3h2v2zm4 0V3q.825 0 1.413.588T21 5zm0 14h2q0 .825-.587 1.413T19 21zm0-2v-2h2v2zm0-4v-2h2v2zm0-4V7h2v2z"></path></svg>
  )
}


function IcBaselineModeEdit(props: SVGProps<SVGSVGElement>) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" { ...props }><path fill="currentColor" d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75zM20.71 7.04a.996.996 0 0 0 0-1.41l-2.34-2.34a.996.996 0 0 0-1.41 0l-1.83 1.83l3.75 3.75z"></path></svg>
  )
}

// Delete Image
{/* { preview && (
          <button
            type="button"
            className="absolute border top-1 h-6 w-6 rounded right-1 bg-muted/90 hover:bg-muted text-muted-foreground"
            // size="icon"
            onClick={ (e) => {
              e.stopPropagation()
              setPreview("")
              onDelete?.()
            } }
          >
            <span className="sr-only">Delete Image</span>
            <PhXBold className="text-sm" />
          </button>
        ) } */}


// function PhXBold(props: SVGProps<SVGSVGElement>) {
//   return (
//     <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 256 256" { ...props }><path fill="currentColor" d="M208.49 191.51a12 12 0 0 1-17 17L128 145l-63.51 63.49a12 12 0 0 1-17-17L111 128L47.51 64.49a12 12 0 0 1 17-17L128 111l63.51-63.52a12 12 0 0 1 17 17L145 128Z"></path></svg>
//   )
// }
