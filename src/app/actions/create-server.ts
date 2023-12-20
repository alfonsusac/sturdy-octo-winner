"use server"

import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { extname as getExt } from 'path'
import { S3 } from '@/lib/upload/config'

export async function generatePresignedUrl(
  userid: string,
  fileName: string,
  contentType: string
) {
  // Required for getSignedUrl Put Object Command Key
  //  this is returned again so that we can upload it to DB as the filename
  const key = `avatars/${userid}${getExt(fileName)}`


  const signedUploadUrl = await getSignedUrl(S3,
    new PutObjectCommand({
      Bucket: 'diskott-storage',
      Key: key,
      ContentType: contentType,
    }), { expiresIn: 3600 }
  )

  return {
    key, signedUploadUrl
  }
}