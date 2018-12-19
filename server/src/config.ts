import { ICoreConfig } from './core/interfaces/core-config.interface';
import { IFacebookConfig, IJwtConfig } from './auth';
import { IDbConfig } from './database/db-config.interface';

export const customCoreConfig: ICoreConfig = {
  debug: true,
  name: '[package]',
  description: '[package]',
  title: '[package]',
  port: 6080,
  swagger_path: 'document',
  protocol: 'http',
  domain: 'localhost',
  version: '[package]',
  contact_email: '[package]',
};

export const customDbConfig: IDbConfig = {
  username: 'minellius_test',
  password: 'minellius_test',
  host: 'localhost',
  port: 3306,
  type: 'mariadb',
  database: 'minellius',
  synchronize: true,
  logging: true,
  entities: [__dirname + '/**/*.entity{.ts,.js}'],
};

export const customFacebookConfig: IFacebookConfig = {
  login_dialog_uri: 'https://www.facebook.com/v2.12/dialog/oauth',
  access_token_uri: 'https://graph.facebook.com/v2.12/oauth/access_token',
  client_id: '193396831615578',
  client_secret: '25f13e20768127ab5cd38ed4b98720a7',
  oauth_redirect_uri: 'http://localhost',
  state: '{fbstate}',
};

export const customJwtConfig: IJwtConfig = {
  authHeaderPrefix: 'Bearer',
  expirationDelta: '7 days',
  secretKey: 'minellius',
};