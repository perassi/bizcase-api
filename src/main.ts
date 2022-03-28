import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { AppModule } from './app.module';

import { setupSwaggerModule } from './setupSwaggerModule';
import { setupFixtures } from './fixtures';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
  });
  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  setupSwaggerModule({ app });

  const configService = app.get(ConfigService);
  const port = configService.get('PORT');

  await setupFixtures();

  await app.listen(port);

  // tslint:disable-next-line: no-console
  console.log(`🚀  Server ready at ${port}`);
}

bootstrap();
