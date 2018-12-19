import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { plainToClass } from 'class-transformer';
import { Strategy } from 'passport-jwt';
import { IJwtPayload } from '../interfaces/jwt-payload.interface';
import { TokenService } from '../services/token.service';
import { GroupsService, User, UsersService } from '../../role';

@Injectable()
export class MinelliusJwtStrategy extends PassportStrategy(Strategy, 'minellius-jwt') {
  constructor(private readonly tokenService: TokenService, private readonly groupsService: GroupsService,
              private readonly userService: UsersService) {
    super({
      passReqToCallback: true,
      jwtFromRequest: req => {
        const token = this.tokenService.extractTokenFromRequest(req);
        return token;
      },
      secretOrKeyProvider: (req, token, done) => {
        let user;
        try {
          user = plainToClass(User, this.tokenService.decode(token));
        } catch (error) {
        } finally {
          const secretKey = this.tokenService.createSecretKey(user);
          done(null, secretKey);
        }
      },
    });
  }

  public async validate(req, payload: IJwtPayload) {
    try {
      await this.groupsService.preloadAll();
    } catch (error) {
      throw new BadRequestException('Error in load groups');
    }
    try {
      let user;
      try {
        user = plainToClass(User, payload);
      } catch (err) {

      }
      // const { user } = await this.userService.findById({ id: payload.id });
      user.groups = user.groups.map(group => this.groupsService.getGroupByName({ name: group.name }));
      return user;
    } catch (error) {
      throw new UnauthorizedException();
    }
  }
}
