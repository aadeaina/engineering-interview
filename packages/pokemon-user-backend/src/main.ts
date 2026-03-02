/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { startDatabase } from './modules/database/db';
import { AppModule } from './modules/app/app.module';

import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';


async function bootstrap() {
  process.on('uncaughtException', (error) => {
    console.error(error);
    process.exit();
  });

  // Start Testcontainers DB only in development mode
if (process.env.NODE_ENV === 'development') {
  try {
    await startDatabase();
  } catch (err) {
    console.warn(
      'Testcontainer DB startup failed. Ensure Docker is running.',
    );
  }
}

  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
  .setTitle('Pokemon Team Builder API')
  .setDescription('API documentation')
  .setVersion('1.0')
  .addServer('http://localhost:3000/api') // optional but clean
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);



  app.enableCors({
    origin: true,
  });

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);

  const port = 3000;
  await app.listen(port);

  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}


bootstrap();



// async function bootstrap() {
//   process.on('uncaughtException', (error) => {
//     console.error(error);
//     process.exit();
//   });

//   await startDatabase();
//   const app = await NestFactory.create(AppModule);
//   const globalPrefix = 'api';
//   app.setGlobalPrefix(globalPrefix);
//   const port = 3000;
//   // const port = process.env.PORT || 3000;
//   await app.listen(port);
//   Logger.log(
//     `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
//   );
// }

// bootstrap();
