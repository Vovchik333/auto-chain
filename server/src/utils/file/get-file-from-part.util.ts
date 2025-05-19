import { MultipartFile } from "@fastify/multipart";

export const getFileFromPart = async (part: MultipartFile): Promise<Storage.MultipartFile> => {
  const buffer = await part.toBuffer();
  return {
    buffer,
    filename: part.filename,
    size: (part as unknown as Record<'size', number>).size,
    mimetype: part.mimetype,
    fieldname: part.fieldname,
  }
}
