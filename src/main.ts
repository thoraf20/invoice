import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import helmet from 'helmet';
import { AppModule } from './app.module';

const corsOrigin = '*';

async function bootstrap() {
  const corsOptions = {
    origin: corsOrigin,
    optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  };

  const app = await NestFactory.create(AppModule, { cors: corsOptions });

  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));

  app.use(helmet());

  await app.listen(process.env.PORT || 3000);
}
bootstrap();
