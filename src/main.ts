import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { AppRoles } from './Constraints/AppRoles';

async function bootstrap(): Promise<void> {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  return await app.listen(process.env.PORT ?? 8080).then(() => {
    console.log(`Listening on PORT ${process.env.PORT ?? 3000} 🤖`);
  });
}

bootstrap().then();
