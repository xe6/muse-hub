import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const srv = await NestFactory.create(AppModule);
  srv.enableCors({
    origin: ['http://localhost:3000'],
  });

  const config = new DocumentBuilder()
    .setTitle('Prototype')
    .setDescription('--')
    .setVersion('1.0')
    .addTag('core')
    .build();
  const document = SwaggerModule.createDocument(srv, config);
  SwaggerModule.setup('api', srv, document);

  await srv.listen(3033, '0.0.0.0');
}
bootstrap();
