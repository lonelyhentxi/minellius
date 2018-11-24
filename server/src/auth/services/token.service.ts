import { Inject, Injectable } from '@nestjs/common';
import { User } from '../../role';
import { decode, sign, verify } from 'jsonwebtoken';
import { IJwtConfig } from '../interfaces/jwt-config.interface';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { ConfigService } from '../../configs';

@Injectable()
export class TokenService {
  constructor(
    private readonly configService: ConfigService,
  ) {
  }

  create(user: User) {
    return sign(
      {
        id: user.id,
        isStaff: user.isStaff,
        isActive: user.isActive,
        isSuperuser: user.isSuperuser,
        groups: user.groups.map(group => {
          return { name: group.name };
        }),
      },
      this.createSecretKey(user),
      {
        expiresIn: this.configService.get().AUTH_JWT_EXPIRATION_DELTA,
      },
    );
  }

  validate(token: string) {
    const data: any = this.decode(token);
    return verify(this.removeHeaderPrefix(token), this.createSecretKey(data));
  }

  decode(token: string) {
    return decode(this.removeHeaderPrefix(token)) as IJwtPayload;
  }

  removeHeaderPrefix(token: string) {
    const config = this.configService.get();
    return config.AUTH_HEADER_PREFIX &&
    token &&
    token.split(config.AUTH_HEADER_PREFIX + ' ').length > 1
      ? token.split(config.AUTH_HEADER_PREFIX + ' ')[1]
      : token;
  }

  extractTokenFromRequest(request) {
    const authorizationHeader = request.headers.authorization
      ? String(request.headers.authorization)
      : null;
    const token = this.removeHeaderPrefix(authorizationHeader);
    return token;
  }

  createSecretKey(user: User) {
    return (
      this.configService.get().AUTH_JWT_SECRET_OR_KEY +
      (user
        ? '$' +
        user.id +
        '$' +
        user.isStaff +
        '$' +
        user.isActive +
        '$' +
        user.isSuperuser +
        (user.groups ? user.groups.map(group => '$' + group.name) : '')
        : '')
    );
  }
}
