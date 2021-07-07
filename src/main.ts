import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify';
import { config } from './common/config';
import { MyLogger } from './middleware/logger';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  let app;
  console.log(config.USE_FASTIFY ? 'Fastify' : 'Express');
  if (config.USE_FASTIFY === true){
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter({ logger: true })
    );
  }else {
    app = await NestFactory.create(AppModule, {
      logger: ['log', 'warn', 'error']
    });
  }
    app.useGlobalInterceptors(new MyLogger());
  await app.listen(config.PORT, '0.0.0.0');
}

process.on('unhandledRejection', () => {
  Logger.error(`Error: Request failed!`);
});

process.on('uncaughtException', (err) => {
  Logger.error(`At ${new Date().toLocaleTimeString("ru", {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      weekday: 'long',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric'
  })} occurred an Internal Server Error with message ${err.message}! Terminating ...`);
  process.exit(1);
});

bootstrap();