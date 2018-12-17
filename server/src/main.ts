import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService, ConfigModule } from './configs';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule,{cors:true});
  const configService = app.select(ConfigModule).get(ConfigService);
  const config = configService.get();
  const options = new DocumentBuilder()
    .setTitle(config.TITLE)
    .setDescription(config.DESCRIPTION)
    .setVersion(config.VERSION)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('document', app, document);
  await app.listen(configService.get().PORT);
}

bootstrap();
