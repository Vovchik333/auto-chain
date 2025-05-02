import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter, NestFastifyApplication } from '@nestjs/platform-fastify';
import { ConfigService } from '@nestjs/config';
import { ApiPath } from './common/enums/api/api-path.enum';
import { ValidationPipe } from '@nestjs/common';
import multipart from '@fastify/multipart';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule, 
    new FastifyAdapter()
  );
  
  await app.register(multipart);

  app.setGlobalPrefix(ApiPath.API);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );

  const configService = app.get(ConfigService);
  const protocol = configService.get<string>('API_PROTOCOL');
  const host = configService.get<string>('API_HOST');
  const port = configService.get<string>('API_PORT');

  await app.listen(port, () => {
    console.log(`Server listening at ${protocol}://${host}:${port}`);
  });
}

bootstrap();
