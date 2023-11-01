import { NextUploadConfig } from "next-upload"
import { env } from "../env"
import { S3Client } from "@aws-sdk/client-s3"

export const config: NextUploadConfig = {
  maxSize: '2mb',
  client: {
    endPoint: env("R2_ENDPOINTS_S3_CLIENT"),
    region: "",
    accessKey: env("R2_ACCESS_KEY_ID"),
    secretKey: env("R2_SECRET_ACCESS_KEY"),
  }
}


export const S3 = new S3Client({
  region: "auto",
  endpoint: env("R2_ENDPOINTS_S3_CLIENT"),
  credentials: {
    accessKeyId: env("R2_ACCESS_KEY_ID"),
    secretAccessKey: env("R2_SECRET_ACCESS_KEY"),
  },
})