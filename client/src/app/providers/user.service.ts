import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {SignInDto} from '../dtos/sign-in.dto';
import {Observable, of} from 'rxjs';
import {UserDto} from '../dtos/user.dto';
import {map, tap} from 'rxjs/operators';
import {UserTokenDto} from '../dtos/user-token.dto';
import {SignUpDto} from '../dtos/sign-up.dto';
import {isNil} from 'lodash';
import {OauthTokensAccesstoken} from '../dtos/oauth-access-token.dto';
import {RedirectUriDto} from '../dtos/redirect-uri.dto';
import {GithubSignInDto} from '../dtos/github-signIn.dto';

@Injectable()
export class UserService {

  private _user: UserDto;
  private _token: string;
  private _oauth: OauthTokensAccesstoken[];

  constructor(
    private readonly httpClient: HttpClient,
    private readonly configService: ConfigService,
  ) {
  }

  private tokenStoragePath = 'access_token';
  private rememberPath = 'user_remember';
  private userPath = 'user';
  private oauthPath = 'oauth';

  set token(token: string) {
    this._token = token;
    if (isNil(token)) {
      localStorage.removeItem(this.tokenStoragePath);
    } else {
      localStorage.setItem(this.tokenStoragePath, token);
    }
  }


  get token(): string {
    if (this._token) {
      return this._token;
    } else {
      const token = localStorage.getItem(this.tokenStoragePath);
      if (token) {
        this._token = token;
        return token;
      } else {
        return undefined;
      }
    }
  }

  set user(user: UserDto) {
    this._user = user;
    if (isNil(user)) {
      localStorage.removeItem(this.userPath);
    } else {
      localStorage.setItem(this.userPath, JSON.stringify(user));
    }
  }

  get user(): UserDto {
    if (this._user) {
      return this._user;
    } else {
      const userStr = localStorage.getItem(this.userPath);
      if (userStr) {
        const user = JSON.parse(userStr);
        this._user = user;
        return user;
      } else {
        return undefined;
      }
    }
  }

  set oauth(oauth: OauthTokensAccesstoken[]) {
    this._oauth = oauth;
    if (isNil(oauth)) {
      localStorage.removeItem(this.oauthPath);
    } else {
      localStorage.setItem(this.oauthPath, JSON.stringify(oauth));
    }
  }

  get oauth(): OauthTokensAccesstoken[] {
    if (this._oauth) {
      return this._oauth;
    } else {
      const oauthStr = localStorage.getItem(this.oauthPath);
      if (oauthStr) {
        const oauth = JSON.parse(oauthStr);
        this._oauth = oauth;
        return oauth;
      } else {
        return undefined;
      }
    }
  }

  logout() {
    this.token = null;
    this.user = null;
  }

  remember(): void {
    localStorage.setItem(this.rememberPath, 'true');
  }

  forget(): void {
    localStorage.removeItem(this.rememberPath);
  }

  get loggedIn(): boolean {
    return isNil(this.user);
  }

  logIn(signIn: SignInDto, remember: boolean) {
    const me = this;
    return (<Observable<UserTokenDto>>this.httpClient
      .post(this.configService.getUrl(this.configService.getRoute().login), signIn))
      .pipe(tap(userToken => {
        me.token = userToken.token;
        me.user = userToken.user;
        if (remember) {
          me.remember();
        } else {
          me.forget();
        }
      }), tap(() => {
        const subscription = me.getOauthAccounts().subscribe(() => {
          subscription.unsubscribe();
        });
      }));
  }

  signUp(signUp: SignUpDto) {
    return (<Observable<UserTokenDto>>this.httpClient
      .post(this.configService.getUrl(this.configService.getRoute().signUp), signUp));
  }

  get github(): OauthTokensAccesstoken {
    return this.oauth.find(oauth => oauth.provider === 'github');
  }

  getOauthAccounts(): Observable<OauthTokensAccesstoken[]> {
    const me = this;
    return (<Observable<OauthTokensAccesstoken[]>>this.httpClient.get(
      this.configService.getUrl(this.configService.getRoute().oauthAccounts)))
      .pipe(tap(res => {
        me.oauth = res;
      }));
  }

  getGithubUri(): Observable<RedirectUriDto> {
    return this.httpClient.get(
      this.configService.getUrl(this.configService.getRoute().githubUri)) as Observable<RedirectUriDto>;
  }

  bindGithub(signInDto: GithubSignInDto): Observable<UserTokenDto> {
    return this.httpClient.post(
      this.configService.getUrl(this.configService.getRoute().githubBind), signInDto) as Observable<UserTokenDto>;
  }
}
