import { BadRequestException, HttpException, HttpService, Inject, Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { RedirectUriDto } from '../dto/redirect-uri.dto';
import { SignInDto } from '../dto/sign-in.dto';
import { SignUpDto } from '../dto/sign-up.dto';
import { ICoreConfig } from '../../core';
import { CustomError, GroupsService, User, UsersService } from '../../role';
import { CORE_CONFIG_TOKEN } from '../../core/configs/core.config';
import { GITHUB_CONFIG_TOKEN } from '../configs/github.config';
import { IGithubConfig } from '../interfaces/github-config.interface';
import { TokenService } from './token.service';
import { UserTokenDto } from '../dto/user-token.dto';
import { stringify } from 'flatted/cjs';

@Injectable()
export class AuthService {
  private localUri: string;

  constructor(
    @Inject(CORE_CONFIG_TOKEN) private readonly coreConfig: ICoreConfig,
    @Inject(GITHUB_CONFIG_TOKEN) private readonly ghConfig: IGithubConfig,
    private readonly httpService: HttpService,
    private readonly usersService: UsersService,
    private readonly groupsService: GroupsService,
    private readonly tokenService: TokenService,
  ) {
    if (this.coreConfig.port) {
      this.localUri = `${this.coreConfig.protocol}://${this.coreConfig.domain}:${this.coreConfig.port}`;
    } else {
      this.localUri = `${this.coreConfig.protocol}://${this.coreConfig.domain}`;
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
    try {
      await this.usersService.assertUsernameAndEmail({
        email: options.email,
        username: options.username,
      });
    } catch (error) {
      throw error;
    }
    const group = this.groupsService.getGroupByName({ name: 'user' });
    const newUser = await plainToClass(User, options).setPassword(options.password);
    newUser.groups = [group];
    return this.usersService.create({ item: newUser });
  }

  async requestGithubRedirectUri(host?: string): Promise<RedirectUriDto> {
    const queryParams: string[] = [
      `client_id=${this.ghConfig.client_id}`,
      `redirect_uri=${this.ghConfig.oauth_redirect_uri}`,
      `state=${this.ghConfig.state}`,
      `scope=user,public_repo`,
    ];
    const redirect_uri: string = `${this.ghConfig.login_dialog_uri}?${queryParams.join('&')}`.replace('{host}', host);
    Logger.log(redirect_uri, AuthService.name + ':requestGithubRedirectUri');
    return {
      redirect_uri,
    };
  }

  async requestGithubToken(code: string): Promise<any> {
    const queryParams: string[] = [
      `client_id=${this.ghConfig.client_id}`,
      `redirect_uri=${this.ghConfig.oauth_redirect_uri}`,
      `client_secret=${this.ghConfig.client_secret}`,
      `code=${code}`,
    ];
    const uri: string = `${this.ghConfig.access_token_uri}?${queryParams.join('&')}`;
    Logger.log(uri, AuthService.name + ':requestGithubToken');
    try {
      const res = await this.httpService
        .get(uri, { headers: { Accept: 'application/json' } })
        .toPromise();
      return res.data.access_token;
    } catch (error) {
      const newError = new UnauthorizedException(error.response.data);
      Logger.error(stringify(newError),
        undefined,
        AuthService.name + ':requestGithubToken',
      );
      throw new UnauthorizedException(error.message);
    }
  }

  async githubSignIn(access_token: string): Promise<UserTokenDto> {
    Logger.log(access_token, AuthService.name + ':githubSignIn');
    const uriToken = `${this.localUri}/api/auth/github/token`;
    try {
      const res =  await this.httpService
        .post(uriToken, { access_token })
        .toPromise();
      return res.data;
    } catch (error) {
      const newError = new HttpException(error.response.data,error.response.status);
      Logger.error(stringify(newError), undefined, AuthService.name + ':githubSignIn');
      throw newError;
    }
  }

  async githubBind(token: string, oauthToken: string): Promise<UserTokenDto> {
    Logger.log(`User token: ${token}, oauth token: ${oauthToken}`, AuthService.name + ':githubBind');
    const uriToken = `${this.localUri}/api/bind/github/token`;
    try {
      const res = await this.httpService
        .post(uriToken, stringify({ oauthToken }), {
          headers: { 'Content-Type': 'application/x-www-form-urlencoded', 'Authorization': this.tokenService.addHeaderPrefix(token) },
        })
        .toPromise();
      return res.data;
    } catch (error) {
      const newError = new HttpException(error.response.data,error.response.status);
      Logger.error(stringify(newError), undefined, AuthService.name + ':githubBind');
      throw newError;
    }
  }
}
