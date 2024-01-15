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

export function bufferToBase64() {

}

// export async function resizeAvatarToSquare(input: Buffer) {
//   const buffer = await sharp(input).resize(512, 512, {
//     fit: "cover",
//     position: "center"
//   }).toBuffer()

//   const url = `data:image/png;base64,${buffer.toString('base64')}}`

//   return {buffer, url}
// }

export async function createCanvasFromResizedBase64(
  base64: string,
  sideLength: number,
  // Todo: Support different aspect ratio?
) {
  const img = await loadImage(base64) //

  const canvas = createCanvas(sideLength, sideLength)
  const ctx = canvas.getContext("2d")
  // ctx?.drawImage(img, 0, 0, targetWidth, targetHeight)

  const srcWidth = img.naturalWidth
  const srcHeight = img.naturalHeight

  let scale = 1
  let startX = 0
  let startY = 0

  if (srcHeight > srcWidth) {
    scale = sideLength / srcWidth
    startX = 0
    startY = - ((srcHeight - srcWidth) / 2) * scale
  }

  if (srcWidth >= srcHeight) {
    scale = sideLength / srcHeight
    startX = - ((srcWidth - srcHeight) / 2) * scale
    startY = 0
  }

  ctx?.drawImage(img, startX, startY, srcWidth * scale, srcHeight * scale)

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
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = function () {
      resolve(reader.result as string)
      //readAsDataURL()	- The result is a string with a data: URL representing the file's data.
      //https://developer.mozilla.org/en-US/docs/Web/API/FileReader/result
    }
    reader.onerror = function () {
      reject(reader.error)
    }
    reader.readAsDataURL(file)
  })
}