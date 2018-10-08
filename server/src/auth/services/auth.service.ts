import {
  BadRequestException,
  ConflictException,
  HttpService,
  Inject,
  Injectable,
  Logger,
} from '@nestjs/common';
import {
  CORE_CONFIG_TOKEN,
  CustomError, ICoreConfig,
} from '../../core';
import {
  GroupsService,
  User,
  UsersService,
} from '../../role';
import { plainToClass } from 'class-transformer';
import { stringify } from 'querystring';
import { map } from 'rxjs/operators';
import { RedirectUriDto } from '../dto/redirect-uri.dto';
import { SignInDto } from '../dto/sign-in.dto';
import { SignUpDto } from '../dto/sign-up.dto';

@Injectable()
export class AuthService {
  private localUri: string;

  constructor(
    @Inject(CORE_CONFIG_TOKEN) private readonly coreConfig: ICoreConfig,
    private readonly httpService: HttpService,
    private readonly usersService: UsersService,
    private readonly groupsService: GroupsService,
  ) {
    if (this.coreConfig.port) {
      this.localUri = `http://${this.coreConfig.domain}:${
        this.coreConfig.port
        }`;
    } else {
      this.localUri = `http://${this.coreConfig.domain}`;
    }
  }

  async info(options: { id: number }) {
    try {
      return await this.usersService.findById(options);
    } catch (error) {
      throw error;
    }
  }

  async signIn(options: SignInDto) {
    try {
      const { user } = await this.usersService.findByEmail(options);
      if (!(await user.validatePassword(options.password))) {
        throw new CustomError('Wrong password');
      }
      return await this.usersService.update({ id: user.id, item: user });
    } catch (error) {
      throw error;
    }
  }

  async signUp(options: SignUpDto) {
    try {
      await this.groupsService.preloadAll();
    } catch (error) {
      throw new BadRequestException('Error in load groups');
    }
    if (options.email) {
      try {
        const userOfEmail: { user } = await this.usersService.findByEmail(
          options,
        );
        throw new ConflictException(
          `User with email "${options.email}" is exists`,
        );
      } catch (error) {
      }
    }
    if (options.username) {
      try {
        const userOfUsername: { user } = await this.usersService.findByUserName(
          options,
        );
        throw new ConflictException(
          `User with username "${options.username}" is exists`,
        );
      } catch (error) {
      }
    }
    const group = this.groupsService.getGroupByName({ name: 'user' });
    const newUser = await plainToClass(User, options).setPassword(
      options.password,
    );
    newUser.groups = [group];
    return this.usersService.create({ item: newUser });
  }
}
