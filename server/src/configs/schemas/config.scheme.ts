import * as Joi from 'joi';

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
  AUTH_JWT_SECRET_OR_KEY: Joi.string(),
  AUTH_JWT_EXPIRES_IN: Joi.number().integer().greater(0),
});