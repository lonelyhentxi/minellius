import { PathService } from './path.service';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from 'joi';
import * as path from 'path';
import { Injectable } from '@nestjs/common';

export interface EnvConfig {
  [key:string]:string;
}

@Injectable()
export class ConfigService {
  private readonly envConfig: EnvConfig;
  private readonly pathService: PathService;

  constructor(pathService: PathService) {
    this.pathService = pathService;
    const config = dotenv.parse(fs.readFileSync(path.join(pathService.config, 'config.env')));
    this.envConfig = this.validateInput(config);
  }

  private validateInput(envConfig: EnvConfig): EnvConfig {
    const envVarsSchema: Joi.ObjectSchema = Joi.object({
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

    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      envVarsSchema,
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig;
  }

  get<T>(key: string,converter:(string)=>T): T {
    return converter(this.envConfig[key]);
  }
}