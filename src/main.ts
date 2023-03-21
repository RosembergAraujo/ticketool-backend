import { INestApplication, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap(): Promise<void> {
    const app: INestApplication = await NestFactory.create(AppModule);
    app.useGlobalPipes(
        new ValidationPipe({
            transform: true,
            whitelist: true,
            forbidNonWhitelisted: true,
        }),
    );
    return await app.listen(process.env.PORT ?? 8080).then((): void => {
        console.log(`Listening on PORT ${process.env.PORT ?? 3000} 🤖`);
    });
}

bootstrap().then();
