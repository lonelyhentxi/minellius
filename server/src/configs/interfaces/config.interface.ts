export interface IConfig {
  readonly NAME: string;
  readonly DESCRIPTION: string;
  readonly TITLE: string;
  readonly NODE_ENV: string;
  readonly PORT: number;
  readonly SWAGGER_PORT: number;
  readonly DOMAIN: string;
  readonly VERSION: string;
  readonly MAILER_HOST: string;
  readonly MAILER_PORT: number;
  readonly MAILER_SECURE: boolean;
  readonly MAILER_USER: string;
  readonly MAILER_PASS: string;
  readonly AUTH_HEADER_PREFIX: string;
  readonly AUTH_JWT_SECRET_OR_KEY: string;
  readonly AUTH_JWT_EXPIRATION_DELTA: string;
  readonly DB_USERNAME: string;
  readonly DB_PASSWORD: string;
  readonly DB_HOSTNAME: string;
  readonly DB_PORT: number;
  readonly DB_TYPE;
  readonly DB_NAME: string;
}