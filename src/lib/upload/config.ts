import { NextUploadConfig } from "next-upload"
import { env } from "../env"

export const config: NextUploadConfig = {
  maxSize: '2mb',
  client: {
    endPoint: env("R2_ENDPOINTS_S3_CLIENT"),
    region: "",
    accessKey: env("R2_ACCESS_KEY_ID"),
    secretKey: env("R2_SECRET_ACCESS_KEY"),
  }
}