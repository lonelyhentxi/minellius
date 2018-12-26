import { ICoreConfig } from './core/interfaces/core-config.interface';
import { IJwtConfig } from './auth';
import { IDbConfig } from './database/db-config.interface';
import { IGithubConfig } from './auth/interfaces/github-config.interface';

export const customCoreConfig: ICoreConfig = {
  debug: true, // [env]
  name: '[package]',
  description: '[package]',
  title: '[package]',
  port: 6080, // [env]
  swagger_path: 'document',
  protocol: 'http', // [env]
  domain: 'localhost',
  version: '[package]',
  contact_email: '[package]',
};

export const customDbConfig: IDbConfig = {
  username: 'minellius_test',
  password: 'minellius_password',
  host: '172.16.0.242',
  port: 5432,
  type: 'postgres',
  database: 'minellius',
  synchronize: true,
  logging: false,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
};

export const customGithubConfig: IGithubConfig = {
  login_dialog_uri: 'https://github.com/login/oauth/authorize',
  access_token_uri: 'https://github.com/login/oauth/access_token',
  client_id: 'e5151fec521713b60cbb',
  client_secret: '14afead0bb183a3fe8ff367245131433a9e8c209',
  oauth_redirect_uri: 'https://minellius.evernightfireworks.com/oauth/github',
  state: '{ghstate}',
};

export const customJwtConfig: IJwtConfig = {
  authHeaderPrefix: 'Bearer',
  expirationDelta: '7 days',
  secretKey: 'minellius',
};