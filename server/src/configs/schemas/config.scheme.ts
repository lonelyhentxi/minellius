import * as Joi from 'joi';

export const ConfigScheme = Joi.object({
  NAME: Joi.string(),
  DESCRIPTION: Joi.string(),
  TITLE: Joi.string(),
  NODE_ENV: Joi.string()
    .valid(['development', 'production'])
    .default('development'),
  PORT: Joi.number().default(3000),
  SWAGGER_PORT: Joi.number().default(3000),
  DOMAIN: Joi.string().hostname(),
  VERSION: Joi.string(),
  MAILER_HOST: Joi.string().hostname(),
  MAILER_PORT: Joi.number().port(),
  MAILER_SECURE: Joi.boolean(),
  MAILER_USER: Joi.string(),
  MAILER_PASS: Joi.string(),
  AUTH_JWT_SECRET_OR_KEY: Joi.string(),
  AUTH_JWT_EXPIRATION_DELTA: Joi.string(),
  AUTH_HEADER_PREFIX: Joi.string(),
  DB_USERNAME: Joi.string(),
  DB_PASSWORD: Joi.strict(),
  DB_HOSTNAME: Joi.string().hostname(),
  DB_PORT: Joi.number().integer().port(),
  DB_TYPE: Joi.string(),
  DB_NAME: Joi.string(),
});