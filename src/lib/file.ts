// Image Cropper
// Credit to https://dninomiya.com/en/docs/image-cropper
// @Daichi Ninomiya

// Resize Base64
// https://stackoverflow.com/questions/20958078/resize-a-base-64-image-in-javascript-without-using-canvas

export function loadImage(base64: string) {
  return new Promise<
    HTMLImageElement
  >((resolve, reject) => {
    const img = new Image()
    img.onerror = function (err) { reject(err) }
    img.onload = function () {
      resolve(img)
    }
    img.src = base64
  })
}
export function createCanvas(width: number, height: number) {
  const canvas = document.createElement("canvas")
  canvas.width = width
  canvas.height = height
  return canvas
}

export function canvas2Blob(canvas: HTMLCanvasElement) {
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      blob => {
        if (blob) resolve(blob)
        if (!blob) reject(new Error("Error converting to blob"))
      }
    )
  })
}

export async function resizeAvatarToSquare(
  base64: string,
  targetWidth: number,
  targetHeight: number,
) {
  const img = await loadImage(base64)
  const canvas = createCanvas(targetWidth, targetHeight)

  const ctx = canvas.getContext("2d")
  ctx?.drawImage(img, 0, 0, targetWidth, targetHeight)

  const url = canvas.toDataURL()
  const blob = await canvas2Blob(canvas)

  return { blob, url }
}

export async function createCanvasFromResizedBase64(
  base64: string,
  targetWidth: number,
  targetHeight: number
) {
  const img = await loadImage(base64)
  const canvas = createCanvas(targetWidth, targetHeight)

  const ctx = canvas.getContext("2d")
  ctx?.drawImage(img, 0, 0, targetWidth, targetHeight)

  const url = canvas.toDataURL()
  const blob = await canvas2Blob(canvas)

  return { blob, url }

  // return new Promise<
  //   {
  //     blob: Blob,
  //     url: string,
  //   }
  // >((resolve, reject) => {
  //   const img = new Image()

  //   img.onerror = function (err) { reject(err) }
  //   img.onload = function () {
  //     const canvas = document.createElement("canvas")
  //     canvas.width = targetWidth
  //     canvas.height = targetHeight

  //     const ctx = canvas.getContext("2d")
  //     ctx?.drawImage(img, 0, 0, targetWidth, targetHeight)

  //     const url = canvas.toDataURL()
  //     canvas.toBlob(
  //       blob => {
  //         if (blob) resolve({ blob, url })
  //         if (!blob) reject(new Error("Error converting to blob"))
  //       }
  //     )
  //   }
  //   img.src = base64
  // })

}

export function readFileAsDataURL(file: File) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = function () {
      resolve(reader.result)
    }
    reader.onerror = function () {
      reject(reader.error)
    }
    reader.readAsDataURL(file);
  })
}