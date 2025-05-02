import { FileTypeValidator, FileValidator, MaxFileSizeValidator } from "@nestjs/common";
import { MultipartOptions } from "src/common/types/multipart-options.type";

export const validateFile = (
  file: Storage.MultipartFile, 
  options: MultipartOptions
): string | void => {
  const validators: FileValidator[] = [];

  if (options.maxFileSize !== undefined) {
    validators.push(new MaxFileSizeValidator({ maxSize: options.maxFileSize }));
  }
  if (options.fileType !== undefined) {
    validators.push(new FileTypeValidator({ fileType: options.fileType }));
  }

  for (const validator of validators) {
    if (validator.isValid(file)) {
      continue;
    }

    return validator.buildErrorMessage(file);
  }
}
