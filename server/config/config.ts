import { IConfig } from '../src/configs';
export const Config: IConfig = {
  NAME: 'minellius',
  TITLE: 'Minellius Server',
  DESCRIPTION: 'Server of Minellius, group project of comp 3002, 2018 fall.',
  NODE_ENV:"development",
  PORT:6080,
  SWAGGER_PORT: 6081,
  DOMAIN: "localhost",
  VERSION: '0.0.2',
  MAILER_HOST:"smtp.qq.com",
  MAILER_PORT:465,
  MAILER_SECURE:true,
  MAILER_USER:"info@evernightfireworks.com",
  MAILER_PASS:"mmruxkeyzoykdebh",
  AUTH_JWT_SECRET_OR_KEY:"secretKey",
  AUTH_HEADER_PREFIX: 'JWT',
  AUTH_JWT_EXPIRATION_DELTA: '7 days',
  DB_USERNAME: 'minellius_test',
  DB_PASSWORD: 'minellius_test',
  DB_HOSTNAME: 'localhost',
  DB_PORT: 3306,
  DB_TYPE: 'mariadb',
  DB_NAME: 'minellius',
};
