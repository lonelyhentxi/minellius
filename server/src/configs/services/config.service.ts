import { PathService } from '../../util/path/path.service';
import * as Joi from 'joi';
import { Injectable } from '@nestjs/common';
import { ConfigScheme, IConfig } from '../index';
import { Config } from '../../../config/config';

@Injectable()
export class ConfigService {
  private readonly envConfig: IConfig;
  private readonly pathService: PathService;

  constructor(pathService: PathService) {
    this.pathService = pathService;
    this.envConfig = this.validateAndConvertInput(Config);
  }

  validateAndConvertInput(inputConfig: any): IConfig {
    const { error, value: validatedEnvConfig } = Joi.validate(
      inputConfig,
      ConfigScheme,
      {
        convert: true,
      },
    );
    if (error) {
      throw new Error(`Config validation error: ${error.message}`);
    }
    return validatedEnvConfig as IConfig;
  }

  get():IConfig {
    return this.envConfig;
  }
}