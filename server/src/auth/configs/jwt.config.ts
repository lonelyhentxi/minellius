import { IJwtConfig } from '../interfaces/jwt-config.interface';

export const defaultJwtConfig: IJwtConfig = {
  authHeaderPrefix: 'Bearer',
  expirationDelta: '7 days',
  secretKey: 'minellius',
};
export const JWT_CONFIG_TOKEN: string = 'JwtConfigToken';
