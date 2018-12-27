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
import {ElectronService} from './electron.service';
import * as urlParse from 'url-parse';
import {UnbindDto} from '../dtos/unbind.dto';
import {InAccountDto} from '../dtos/in-account.dto';
import {OutAccountDto} from '../dtos/out-account.dto';

@Injectable()
export class UserService {

  private _user: UserDto;
  private _token: string;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly configService: ConfigService,
    private readonly electron: ElectronService,
  ) {
  }

  private tokenStoragePath = 'access_token';
  private rememberPath = 'user_remember';
  private userPath = 'user';

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
    return !isNil(this.user);
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

  getOauthAccounts(): Observable<OauthTokensAccesstoken[]> {
    return (<Observable<OauthTokensAccesstoken[]>>this.httpClient.get(
      this.configService.getUrl(this.configService.getRoute().oauthAccounts)));
  }

  getGithubAccount(): Observable<OauthTokensAccesstoken | undefined> {
    return this.getOauthAccounts().pipe(map(accounts => accounts.find(account => account.provider === 'github')));
  }

  getGithubUri(): Observable<RedirectUriDto> {
    return this.httpClient.get(
      this.configService.getUrl(this.configService.getRoute().githubUri)) as Observable<RedirectUriDto>;
  }

  bindGithub(signInDto: GithubSignInDto): Observable<UserTokenDto> {
    return this.httpClient.post(
      this.configService.getUrl(this.configService.getRoute().githubBind), signInDto) as Observable<UserTokenDto>;
  }

  loginGithub(signInDto: GithubSignInDto): Observable<UserTokenDto> {
    return (this.httpClient.post(
      this.configService.getUrl(this.configService.getRoute().githubSignIn), signInDto) as Observable<UserTokenDto>)
      .pipe(
        tap((userToken) => {
          this.user = userToken.user;
          this.token = userToken.token;
        })
      );
  }

  async waitGithubAuth(): Promise<string | undefined> {
    const me = this;
    return await new Promise((resolve, reject) => {
      let url: string;
      let bind = false;
      const win = new me.electron.remote.BrowserWindow({
        height: 820,
        useContentSize: false,
        resizable: false,
        opacity: 1,
        frame: true,
        transparent: false,
        maximizable: false,
        minimizable: false,
        fullscreenable: false,
        alwaysOnTop: true,
        autoHideMenuBar: false,
      });
      const filters = {
        urls: ['https://minellius.evernightfireworks.com/', 'https://github.com',]
      };
      this.getGithubUri().toPromise().then((uri) => {
        win.webContents.session.clearStorageData({origin: 'https://github.com'}, () => {
          win.webContents.session.clearCache(() => {
            win.loadURL(uri.redirect_uri);
            win.show();
            win.webContents.session.webRequest.onBeforeRedirect(filters, details => {
              url = details.redirectURL;
              if (url.startsWith(filters.urls[0])) {
                bind = true;
                win.close();
              } else if(details.url.startsWith(filters.urls[0])) {
                url = details.url;
                bind = true;
                win.close();
              } else {
                win.loadURL(url);
              }
            });
            win.once('close', () => {
              win.destroy();
              if (bind) {
                resolve(me.extractCodeFromUrl(url));
              } else {
                resolve(undefined);
              }
            });
          });
        });
      }, (err) => {
        if (err.status === 404) {
          resolve(me.extractCodeFromUrl(url));
        } else {
          reject(err);
        }
      });
    }) as Promise<string | undefined>;
  }

  extractCodeFromUrl(url: string): string {
    const parsedUrl = urlParse(url, true);
    return parsedUrl.query['code'];
  }

  async unbind(unbind: UnbindDto): Promise<void> {
    (await this.httpClient.post(this.configService.getUrl(this.configService.getRoute().unbind), unbind).toPromise());
  }

  updateAccount(update: InAccountDto): Observable<OutAccountDto> {
    const me = this;
    return (this.httpClient.post(
      this.configService.getUrl(this.configService.getRoute().accountUpdate),
      update) as Observable<OutAccountDto>)
      .pipe(tap(outAccount => {
        me.user = outAccount.user;
      }));
  }
}
