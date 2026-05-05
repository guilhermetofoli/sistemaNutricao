import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Ativa o firewall de entrada de dados
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(3000);
  console.log('Servidor rodando em: http://localhost:3000');
}
bootstrap();