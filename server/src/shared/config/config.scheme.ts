import * as Joi from 'joi';

export interface EnvConfig {
  [key: string]: any;
}

export interface Config extends EnvConfig {
  readonly NODE_ENV: string;
  readonly PORT: number;
  readonly MAILER_HOST: string;
  readonly MAILER_PORT: number;
  readonly MAILER_SECURE: boolean;
  readonly MAILER_USER: string;
  readonly MAILER_PASS: string;
}

export const ConfigScheme = Joi.object({
  NODE_ENV: Joi.string()
    .valid(['development', 'production'])
    .default('development'),
  PORT: Joi.number().default(3000),
  MAILER_HOST: Joi.string().hostname(),
  MAILER_PORT: Joi.number().port(),
  MAILER_SECURE: Joi.boolean(),
  MAILER_USER: Joi.string(),
  MAILER_PASS: Joi.string(),
});