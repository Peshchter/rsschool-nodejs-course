import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify';
import { config } from './common/config';

async function bootstrapE() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn'],
  });
  await app.listen(config.PORT);
}

async function bootstrapF() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true })
  );
  await app.listen(config.PORT, '0.0.0.0');
}

config.USE_FASTIFY ? bootstrapF() : bootstrapE();

