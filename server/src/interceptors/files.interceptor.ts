import { BadRequestException, CallHandler, ExecutionContext, mixin, NestInterceptor, Type, UnprocessableEntityException } from "@nestjs/common";
import { FastifyRequest } from "fastify";
import { Observable } from "rxjs";
import { MultipartOptions } from "src/common/types/multipart-options.type";
import { validateFile } from "src/utils/file/validate-file.helper";
import { getFileFromPart } from "src/utils/file/get-file-from-part.util";

export function MultipartInterceptor(options: MultipartOptions = {}): Type<NestInterceptor> {
  class MixinInterceptor implements NestInterceptor {
    async intercept(context: ExecutionContext, next: CallHandler<any>): Promise<Observable<any>> {
      const request = context.switchToHttp().getRequest<FastifyRequest>();

      if (!request.isMultipart) {
        throw new BadRequestException('The request should be a form-data');
      }

      const files = {};
      const body = {};

      for await (const part of request.parts()) {
        if (part.type !== 'file') {
          body[part.fieldname] = part.value;
          continue;
        }

        const file = await getFileFromPart(part);
        const validationRes = validateFile(file, options);

        if (validationRes) {
          throw new UnprocessableEntityException(validationRes);
        }

        files[part.fieldname] = files[part.fieldname] || [];
        files[part.fieldname].push(file);
      }

      request.storedFiles = files;
      request.body = body;

      return next.handle();
    }
  }

  return mixin(MixinInterceptor);
}
