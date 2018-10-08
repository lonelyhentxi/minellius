import { defaultJwtConfig, JWT_CONFIG_TOKEN } from './jwt.config';

export const configs = [
  {
    provide: JWT_CONFIG_TOKEN,
    useValue: defaultJwtConfig,
  },
];
