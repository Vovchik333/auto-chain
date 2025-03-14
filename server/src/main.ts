import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { config } from './config';

async function bootstrap() {
  const { host, port, protocol } = config.api;

  const app = await NestFactory.create(AppModule, new FastifyAdapter());
  await app.listen(port, () => {
    console.log(`Server listening at ${protocol}://${host}:${port}`);
  });
}

bootstrap();
