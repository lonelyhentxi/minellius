import * as tsConfig from '../tsconfig.json';
import * as tsConfigPaths from 'tsconfig-paths';
import * as ConnectionString from 'connection-string';
import * as chmod from 'chmod';
const NODE_ENV:string = process.env.NODE_ENV || 'development';

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService, ConfigModule } from './configs';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.select(ConfigModule).get(ConfigService);
  await app.listen(configService.get().PORT);
}
bootstrap();
