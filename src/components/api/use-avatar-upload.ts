import { createCanvasFromResizedBase64, readFileAsDataURL } from "@/lib/client/file"
import { useEffect, useState, useTransition } from "react"
import { FileRejection, useDropzone } from "react-dropzone"
import { toast } from "sonner"

export function useAvatarUpload(
  param?: {
    onImageSelected?(
      originalFile: File,
      resizedBlob: Blob,
    ): void
    onImageRejected?(rejection: FileRejection): void
    onError?(error: Error): void
  }
) {
  const [preview, setPreview] = useState<null | string>(null)
  const [isPending, startTransition] = useTransition()
  const dropzone = useDropzone({
    accept: { "image/jpeg": [], "image/png": [] },
    noKeyboard: true,
    multiple: false,
    async onDropAccepted(dropped) {
      // setLoading(true)
      startTransition(async () => {
        const imgFile = dropped[0]
        const imgBase64 = await readFileAsDataURL(imgFile)
        const newimg = await createCanvasFromResizedBase64(imgBase64, 512)
        setPreview(newimg.url)
        // setLoading(false)
        param?.onImageSelected?.(dropped[0], newimg.blob)
      })
    },
    onDropRejected(fileRejections) {
      param?.onImageRejected?.(fileRejections[0])
      fileRejections.map(f => toast.error(f.errors.map(e => e.message).join('\n')))
    },
    onError(error) {
      param?.onError?.(error)
      toast.error(error.message)
    }
  })
  useEffect(() => {
    return () => {
      if (preview) {
        URL.revokeObjectURL(preview)
      }
    }
  }, [preview])

  return { ...dropzone, preview, isLoading: isPending }
}


// Prev Version 
//
// const [preview, setPreview] = useState<null | string>()
// const { getRootProps, getInputProps } = useDropzone({
//   accept: { "image/jpeg": [], "image/png": [] },
//   noKeyboard: true,
//   multiple: false,
//   onDropAccepted(dropped) {
//     setPreview(URL.createObjectURL(dropped[0]))
//     // toast.success("File uploaded (test)")
//     // form.setValue("serverPicture", dropped[0])
//   },
//   onDropRejected(fileRejections) {
//     fileRejections.map(f => toast.error(f.errors.map(e => e.message).join('\n')))
//   },
// })
// useEffect(() => {
//   return () => URL.revokeObjectURL(preview ?? "")
// }, [preview])