import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  await app.listen(port);

  // tslint:disable-next-line: no-console
  console.log(`🚀  Server ready at ${port}`);
}

bootstrap();
