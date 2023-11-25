import { LoggerService } from '@/infrastructure/gateways/logger/logger.service';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AllExceptionFilter } from './common/filters';
import { LoggerInterceptor, PaginationInterceptor, ValidationInterceptor } from './common/interceptors';
import { setupSwagger } from './config/swagger/setup';

async function bootstrap() {
  const prefix = `${process.env.URI_PREFIX}`;
  const port = process.env.PORT;
  const app = await NestFactory.create(AppModule, { cors: true });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  app.useGlobalInterceptors(new PaginationInterceptor());
  app.useGlobalInterceptors(new ValidationInterceptor());
  app.useGlobalInterceptors(new LoggerInterceptor(new LoggerService()));
  app.useGlobalFilters(new AllExceptionFilter(new LoggerService()));
  app.setGlobalPrefix(prefix);
  app.enableVersioning({ type: VersioningType.URI, defaultVersion: ['1'] });
  setupSwagger(prefix, app);
  await app.listen(port);
}
bootstrap();
