import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { CORE_CONFIG_TOKEN, ICoreConfig } from './core';
import { appPipes, appFilters } from './role';
import {
  appFilters as authAppFilters,
  defaultJwtConfig,
  IJwtConfig,
  JWT_CONFIG_TOKEN,
} from './auth';
import { readFileSync } from 'fs';
import { customCoreConfig, customGithubConfig, customJwtConfig } from './config';
import { IGithubConfig } from './auth/interfaces/github-config.interface';
import { defaultGithubConfig, GITHUB_CONFIG_TOKEN } from './auth/configs/github.config';

async function bootstrap() {
  const packageBody = JSON.parse(readFileSync('./package.json', { encoding: 'utf-8' }));
  const coreConfig: ICoreConfig = {
    ...customCoreConfig,
    debug: process.env.DEBUG === 'true',
    protocol: process.env.PROTOCOL === 'https' ? 'https' : 'http',
    port: process.env.PORT ? +process.env.PORT : customCoreConfig.port,
    externalPort: process.env.EXTERNAL_PORT ? +process.env.EXTERNAL_PORT : undefined,
    domain: process.env.DOMAIN? process.env.DOMAIN: 'localhost',
    name: packageBody.name,
    title: packageBody.name,
    description: packageBody.description,
    version: packageBody.version,
    contact_email: packageBody.authors[0].email,
  };
  const githubConfig: IGithubConfig = {
    ...defaultGithubConfig,
    ...customGithubConfig,
    oauth_redirect_uri: `http://127.0.0.1:4200/oauth/github`,
  };
  const jwtConfig: IJwtConfig = {
    ...defaultJwtConfig,
    ...customJwtConfig,
  };
  const app = await NestFactory.create(
    AppModule.forRoot({
      providers: [
        { provide: CORE_CONFIG_TOKEN, useValue: coreConfig },
        { provide: JWT_CONFIG_TOKEN, useValue: jwtConfig },
        { provide: GITHUB_CONFIG_TOKEN, useValue: githubConfig },
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
}

bootstrap();
