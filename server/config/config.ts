import { IConfig } from '../src/configs';
export const Config: IConfig = {
  NODE_ENV:"development",
  PORT:3000,
  MAILER_HOST:"smtp.qq.com",
  MAILER_PORT:465,
  MAILER_SECURE:true,
  MAILER_USER:"info@evernightfireworks.com",
  MAILER_PASS:"mmruxkeyzoykdebh",
  AUTH_JWT_SECRET_OR_KEY:"secretKey",
  AUTH_JWT_EXPIRATION_DELTA: '7 days',
};
