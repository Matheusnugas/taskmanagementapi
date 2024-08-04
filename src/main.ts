import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './common/http-exception.filter';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.useGlobalPipes(new ValidationPipe());
  app.setGlobalPrefix('api');
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription(
      `This is the API for a Task Management system. Every task route requires the user to be authenticated. To get your Bearer token, create an account and login, and one will be provided to you. Don't forget to add your token to the Authorize field on Swagger API Docs, or if you're using Postman, test it like:

      Bearer 9uasud98asudd198JASjasd9
      
      `,
    )
    .setVersion('1.0')
    .addBearerAuth(
      {
        description: `Please enter the Bearer token you got by signing in. Format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      'access-token',
    )

    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

  await app.listen(3000);
}
bootstrap();
