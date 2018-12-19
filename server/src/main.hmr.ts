import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { CORE_CONFIG_TOKEN, ICoreConfig } from './core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { readFileSync } from "fs";
import { customCoreConfig, customFacebookConfig, customJwtConfig } from './config';
import {
  appFilters as authAppFilters, defaultFacebookConfig,
  defaultJwtConfig, FACEBOOK_CONFIG_TOKEN,
  IFacebookConfig,
  IJwtConfig,
  JWT_CONFIG_TOKEN,
} from './auth';
import { appFilters } from './role/filters';
import { appPipes } from './role/pipes';

declare const module: any;

async function bootstrap() {
  const packageBody = JSON.parse(readFileSync('./package.json', { encoding: 'utf-8' }));
  const coreConfig: ICoreConfig = {
    ...customCoreConfig,
    debug: process.env.DEBUG === 'true',
    protocol: process.env.PROTOCOL === 'https' ? 'https' : 'http',
    port: process.env.PORT ? +process.env.PORT : customCoreConfig.port,
    externalPort: process.env.EXTERNAL_PORT ? +process.env.EXTERNAL_PORT : undefined,
    domain: process.env.DOMAIN,
    name: packageBody.name,
    title: packageBody.name,
    description: packageBody.description,
    version: packageBody.version,
    contact_email: packageBody.authors[0].email,
  };
  const facebookConfig: IFacebookConfig = {
    ...defaultFacebookConfig,
    ...customFacebookConfig,
  };
  const jwtConfig: IJwtConfig = {
    ...defaultJwtConfig,
    ...customJwtConfig,
  };
  const app = await NestFactory.create(
    AppModule.forRoot({
      providers: [
        {provide: CORE_CONFIG_TOKEN,useValue:coreConfig},
        { provide: JWT_CONFIG_TOKEN, useValue: jwtConfig },
        { provide: FACEBOOK_CONFIG_TOKEN, useValue: facebookConfig },
        ...appFilters,
        ...authAppFilters,
        ...appPipes,
      ],
    }), { cors: true });
  const options = new DocumentBuilder()
    .setTitle(coreConfig.title)
    .setDescription(coreConfig.description)
    .setVersion(coreConfig.version)
    .setContactEmail(coreConfig.contact_email)
    .addBearerAuth('Authorization', 'header')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(coreConfig.swagger_path, app, document);
  await app.listen(coreConfig.port);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap();
