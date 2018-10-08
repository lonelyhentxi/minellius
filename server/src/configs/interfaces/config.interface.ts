export interface IConfig {
  readonly NODE_ENV: string;
  readonly PORT: number;
  readonly MAILER_HOST: string;
  readonly MAILER_PORT: number;
  readonly MAILER_SECURE: boolean;
  readonly MAILER_USER: string;
  readonly MAILER_PASS: string;
  readonly AUTH_JWT_SECRET_OR_KEY: string;
  readonly AUTH_JWT_EXPIRATION_DELTA: string;
}