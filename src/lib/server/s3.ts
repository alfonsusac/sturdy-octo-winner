import { S3Client } from "@aws-sdk/client-s3"
import { createSingleton } from "./singleton"

export const S3 = createSingleton('s3',
  () => new S3Client({
    region: "ap-southeast-1",
    // endpoint: env("R2_ENDPOINTS_S3_CLIENT"),
    // credentials: {
    //   accessKeyId: env("R2_ACCESS_KEY_ID"),
    //   secretAccessKey: env("R2_SECRET_ACCESS_KEY"),
    // },
  })
)