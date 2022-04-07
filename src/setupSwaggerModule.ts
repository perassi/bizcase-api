import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export const setupSwaggerModule = ({ app }) => {
  const options = new DocumentBuilder()
    .setTitle('Biz Case API')
    .setDescription('The bizcases API description')
    .setVersion('1.0')
    .addTag('bizcases')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('/docs', app, document);
};
