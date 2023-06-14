import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { HttpExceptionFilter } from './http-exception.filter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as session from 'express-session';
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.use(
    session({
      secret: '1431had-4353hda-ass-242as-awq',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 36000000,
      },
    }),
  );

  //swagger
  const config = new DocumentBuilder()
    .setTitle('Cats example')
    .setDescription('The cats API description')
    .setVersion('1.0')
    .addTag('cats')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  //views
  app.useStaticAssets(join(__dirname, '..', 'views/assets'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));
  app.setViewEngine('ejs');
  //filter Exceptions
  app.useGlobalFilters(new HttpExceptionFilter());
  //transforms
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
