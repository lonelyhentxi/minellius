import { ICoreConfig } from './core/interfaces/core-config.interface';
import { IJwtConfig } from './auth';
import { IDbConfig } from './database/db-config.interface';
import { IGithubConfig } from './auth/interfaces/github-config.interface';

import { readFileSync } from 'fs';
const packageBody = JSON.parse(readFileSync('./package.json', { encoding: 'utf-8' }));

export const customCoreConfig: ICoreConfig = {
  debug: process.env.DEBUG === 'true',
  protocol: process.env.PROTOCOL === 'https' ? 'https' : 'http',
  port: process.env.PORT ? +process.env.PORT : 6080,
  externalPort: process.env.EXTERNAL_PORT ? +process.env.EXTERNAL_PORT : undefined,
  domain: process.env.DOMAIN? process.env.DOMAIN: 'localhost',
  name: packageBody.name,
  title: packageBody.name,
  description: packageBody.description?packageBody.description:packageBody.name,
  version: packageBody.version,
  contact_email: (packageBody.authors[0])?(packageBody.authors[0].email?packageBody.authors[0].email:packageBody.authors[0]):(''),
  swagger_path: process.env.SWAGGER_PATH? process.env.SWAGGER_PATH: 'document'
};

export const customDbConfig: IDbConfig = {
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT?+process.env.DATABASE_PORT:5432,
  type: process.env.DATABASE_TYPE?process.env.DATABASE_TYPE:'postgres',
  database: process.env.DATABASE_NAME,
  synchronize: true,
  logging: process.env.NODE_ENV==='debug'||process.env.NODE_ENV==='development',
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
};

export const customGithubConfig: IGithubConfig = {
  login_dialog_uri: 'https://github.com/login/oauth/authorize',
  access_token_uri: 'https://github.com/login/oauth/access_token',
  client_id: process.env.GITHUB_CLIENTID,
  client_secret: process.env.GITHUB_CLIENTSECRET,
  oauth_redirect_uri: process.env.GITHUB_REDIRECT_URI,
  state: '{ghstate}',
};

export const customJwtConfig: IJwtConfig = {
  authHeaderPrefix: 'Bearer',
  expirationDelta: process.env.JWT_EXPIRATION,
  secretKey: process.env.JWT_SECRETKEY,
};