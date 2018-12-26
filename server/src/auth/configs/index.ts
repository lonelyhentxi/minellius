import { defaultJwtConfig, JWT_CONFIG_TOKEN } from '../configs/jwt.config';
import { defaultGithubConfig, GITHUB_CONFIG_TOKEN } from './github.config';

export const configs = [
  {
    provide: JWT_CONFIG_TOKEN,
    useValue: defaultJwtConfig,
  },
  {
    provide: GITHUB_CONFIG_TOKEN,
    useValue: defaultGithubConfig,
  },
];
