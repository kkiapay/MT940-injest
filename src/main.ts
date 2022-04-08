import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger:
      process.env.LOG_LEVEL === 'debug'
        ? ['debug', 'error', 'warn']
        : ['error', 'warn'],
  });
  console.log('ok');
  await app.listen(process.env.APP_PORT || 3000);
}
bootstrap();
