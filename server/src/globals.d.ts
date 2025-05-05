declare namespace Storage {
  interface MultipartFile {
    buffer: Buffer;
    filename: string;
    size: number;
    mimetype: string;
    fieldname: string;
  }
}

declare namespace App {
  interface Response {
    header: (name: string, value: string) => void;
  }
}

declare module 'fastify' {
  interface FastifyRequest {
    storedFiles: Record<string, Storage.MultipartFile[]>;
    body: unknown;
  }
}
