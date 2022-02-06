import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import {
  DocumentBuilder,
  ExpressSwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  const options: ExpressSwaggerCustomOptions = {
    customSiteTitle: 'meals api',
    customfavIcon: '',
  };
  const config = new DocumentBuilder()
    .setTitle('meals api')
    .setDescription('The meals API description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('', app, document, options);
  await app.listen(3000);
}
bootstrap();
