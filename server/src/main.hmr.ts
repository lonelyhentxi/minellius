import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService, ConfigModule } from './configs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

declare const module: any;

async function bootstrap() {
  const documentApp = await NestFactory.create(AppModule);
  const app = await NestFactory.create(AppModule,{cors:true});
  const configService = documentApp.select(ConfigModule).get(ConfigService);
  const config = configService.get();
  const options = new DocumentBuilder()
    .setTitle(config.TITLE)
    .setDescription(config.DESCRIPTION)
    .setVersion(config.VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(configService.get().SWAGGER_PORT);
  await app.listen(configService.get().PORT);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
