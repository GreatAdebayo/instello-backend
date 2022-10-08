import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as bodyParser from 'body-parser';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  //request validation
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true
  }))
  app.use(bodyParser.json({ limit: '500mb' }));
  await app.listen(process.env.PORT);
}
bootstrap();

