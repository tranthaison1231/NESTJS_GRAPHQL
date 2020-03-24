import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';
import * as rateLimit from 'express-rate-limit';
import { PORT } from './environments';
import * as compression from 'compression';
import { Logger, InternalServerErrorException } from '@nestjs/common';
import * as helmet from 'helmet';

async function bootstrap() {
  try {
    const logger = new Logger('bootstrap');

    const app = await NestFactory.create<NestExpressApplication>(AppModule, {
      cors: true
    });

    // Compression
    app.use(compression());

    // Security
    app.use(helmet());
    app.use(
      rateLimit({
        windowMs: 15 * 60 * 1000, // 15 minutes
        max: 100 // limit each IP to 100 requests per windowMs
      })
    );

    await app.listen(PORT);
    logger.log(`Application listening on port ${PORT}`);
  } catch (error) {
    Logger.error(`❌  Error starting server, ${error}`, '', 'Bootstrap', false);
    process.exit();
    throw new InternalServerErrorException(error);
  }
}
bootstrap().catch(e => {
  throw e;
});
