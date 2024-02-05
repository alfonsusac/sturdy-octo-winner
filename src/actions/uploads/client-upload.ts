import { s_getPresignedURL } from "@/actions/uploads/get-presigned-url"


export async function upload(data: Blob, filepath: string) {
  const uploadURL = await s_getPresignedURL(filepath)
  if (!uploadURL) throw new Error('Something went wrong when prefetching presigned URL')
  await fetch(uploadURL, {method: "PUT",
    body: data,
  })
  return uploadURL.split('?')[0] // returns image url
}
