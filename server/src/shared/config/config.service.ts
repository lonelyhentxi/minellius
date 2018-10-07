import { PathService } from '../path.service';
import * as dotenv from 'dotenv';
import * as fs from 'fs';
import * as Joi from 'joi';
import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { EnvConfig, ConfigScheme, Config } from './config.scheme';

@Injectable()
export class ConfigService {
  readonly envConfig: Config;
  private readonly pathService: PathService;

  constructor(pathService: PathService) {
    this.pathService = pathService;
    const config = dotenv.parse(fs.readFileSync(path.join(pathService.config, 'config.env')));
    this.envConfig = this.validateAndConvertInput(config);
  }

  private validateAndConvertInput(envConfig: EnvConfig): Config {
    const { error, value: validatedEnvConfig } = Joi.validate(
      envConfig,
      ConfigScheme,
      {
        convert: true,
      },
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig as Config;
  }
}