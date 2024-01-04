import { useState } from "react"
import { useDropzone } from "react-dropzone"

export default function AvatarUploader() {
  const [image, setImage] = useState<File>()
  const [scale, setScale] = useState(1.0)
  const [open, setOpen] = useState(false);
  const { getRootProps, getInputProps, isDragAccept } = useDropzone({
    noKeyboard: true,
    maxSize: 1024 * 1024 * 2,
    accept: {
      "image/jpeg": [],
      "image/png": [],
    },
    onDropAccepted: (dropped) => {
      setImage(dropped[0])
      setScale(1.0)
      setOpen(true)
    },
  })
}