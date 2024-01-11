import { readFileAsDataURL } from "@/lib/file"
import { useEffect, useState } from "react"
import { FileRejection, useDropzone } from "react-dropzone"
import { toast } from "sonner"

export function useAvatarUpload(
  param?: {
    transformImage(file: File): void
    onImageSelected?(file: File): void
    onImageRejected?(rejection: FileRejection): void
    onError?(error: Error): void
  }
) {
  const [preview, setPreview] = useState<null | string>(null)
  const dropzone = useDropzone({
    accept: { "image/jpeg": [], "image/png": [] },
    noKeyboard: true,
    multiple: false,
    async onDropAccepted(dropped, event) {
      const imgFile = dropped[0]
      const imgBase64 = await readFileAsDataURL(imgFile)


      
      setPreview(URL.createObjectURL(dropped[0]))
      param?.onImageSelected?.(dropped[0])
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

  return { ...dropzone, preview }
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