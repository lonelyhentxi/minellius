import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigModule, ConfigService } from './configs';

declare const module: any;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  /**
   * get port from config service
   * and the more important thing is validate the input config
   * in server/config/config.ts
   */
  const configService = app.select(ConfigModule).get(ConfigService);
  await app.listen(configService.get().PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
