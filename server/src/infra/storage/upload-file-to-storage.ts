import { Upload } from "@aws-sdk/lib-storage"
import { Readable } from "node:stream"
import { randomUUID } from "node:crypto"
import { basename, extname } from "node:path"
import { z } from "zod"
import { r2 } from "./client"
import { env } from "../../env"

const uploadFileToStorageInput = z.object({
  folder: z.enum(["downloads-links"]),
  fileName: z.string(),
  contentType: z.string(),
  contentStream: z.instanceof(Readable),
})

type UploadFileToStorageInput = z.input<
  typeof uploadFileToStorageInput
>

export async function uploadFileToStorage(
  input: UploadFileToStorageInput
) {
  const { fileName, contentStream, contentType, folder } =
    uploadFileToStorageInput.parse(input)

  const fileExtension = extname(fileName)
  const fileNameWithoutExtension = basename(fileName, fileExtension)

  const sanitizedFileName = fileNameWithoutExtension.replace(
    /[^a-zA-Z0-9]/g,
    ""
  )

  const sanitizedFileNameWithExtension =
    sanitizedFileName.concat(fileExtension)

  const uniqueFileName = `${folder}/${randomUUID()}-${sanitizedFileNameWithExtension}`

  const upload = new Upload({
    client: r2,
    params: {
      Bucket: env.CLAOUDFLARE_BUCKETE,
      Key: uniqueFileName,
      Body: contentStream,
      ContentType: contentType,
    },
  })

  await upload.done()

  return {
    key: uniqueFileName,
    url: new URL(
      uniqueFileName,
      env.CLAOUDFLARE_PUBLIC_URL
    ).toString(),
  }
}
