import { NestFactory } from '@nestjs/core';
import { FastifyAdapter, NestFastifyApplication} from '@nestjs/platform-fastify';
import { AppModule } from './app/app.module';
import { config } from './common/config';
import { MyLogger } from './middleware/logger';

async function bootstrap() {
  let app;
  console.log(config.USE_FASTIFY ? 'Fastify' : 'Express');
  if (config.USE_FASTIFY === true){
    app = await NestFactory.create<NestFastifyApplication>(
      AppModule,
      new FastifyAdapter()
    );
  }else {
    app = await NestFactory.create(AppModule);
  }
    app.useGlobalInterceptors(new MyLogger());
  await app.listen(config.PORT, '0.0.0.0');
}

bootstrap();