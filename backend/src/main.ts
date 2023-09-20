import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';
import { ValidationPipe } from '@nestjs/common';
import * as graphqlUploadExpress from 'graphql-upload/graphqlUploadExpress.js';

import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    new ExpressAdapter()
  );

  app.enableCors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);

      const allowedOrigins = [
        'http://localhost:3001',
        'http://localhost:3000',
        'https://studio.apollographql.com',
      ];

      if (allowedOrigins.indexOf(origin) === -1) {
        const msg = `The CORS policy error: ${origin}`;
        return callback(new Error(msg), false);
      }
      return callback(null, true);
    },
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true,
  });

  app.use(
    '/graphql',
    graphqlUploadExpress({ maxFileSize: 100000000, maxFiles: 10 })
  );

  /**
   * Uncommenting global ValidationPipe will make grapqhl file upload stop working
   */

  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: false,
  //     transform: false
  //   })
  // )

  await app.listen(3001);
}
bootstrap();
