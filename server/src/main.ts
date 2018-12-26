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
import { customCoreConfig, customGithubConfig, customJwtConfig } from './config';
import { IGithubConfig } from './auth/interfaces/github-config.interface';
import { defaultGithubConfig, GITHUB_CONFIG_TOKEN } from './auth/configs/github.config';

async function bootstrap() {
  const coreConfig: ICoreConfig = customCoreConfig;
  const githubConfig: IGithubConfig = {
    ...defaultGithubConfig,
    ...customGithubConfig,
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
    .setSchemes(coreConfig.protocol)
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup(coreConfig.swagger_path, app, document);
  await app.listen(coreConfig.port);
}

bootstrap();
