import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { config } from './common/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(config.PORT);
}
bootstrap();
