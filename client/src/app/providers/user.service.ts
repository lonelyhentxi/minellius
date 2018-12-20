import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {SignInDto} from '../dtos/sign-in.dto';
import {Observable} from 'rxjs';
import {UserDto} from '../dtos/user.dto';
import {tap} from 'rxjs/operators';
import {UserTokenDto} from '../dtos/user-token.dto';
import {SignUpDto} from '../dtos/sign-up.dto';

@Injectable()
export class UserService {

  user: UserDto;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly configService: ConfigService,
  ) {
  }

  private tokenStoragePath = 'access_token';
  private rememberPath = 'user_remember';

  private setToken(token: string | null): void {
    localStorage.setItem(this.tokenStoragePath, token);
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenStoragePath);
  }

  private clearToken(): void {
    localStorage.removeItem(this.tokenStoragePath);
  }

  logout() {
    this.clearToken();
  }

  remember(): void {
    localStorage.setItem(this.rememberPath, 'true');
  }

  forget(): void {
    localStorage.removeItem(this.rememberPath);
  }

  get loggedIn(): boolean {
    return this.getToken() !== null;
  }

  logIn(signIn: SignInDto, remember: boolean) {
    const me = this;
    return (<Observable<UserTokenDto>>this.httpClient
      .post(this.configService.getUrl(this.configService.getRoute().login), signIn))
      .pipe(tap(userToken => {
        me.setToken(userToken.token);
        me.user = userToken.user;
        if (remember) {
          me.remember();
        } else {
          me.forget();
        }
      }));
  }

  signUp(signUp: SignUpDto) {
    const me = this;
    return (<Observable<UserTokenDto>>this.httpClient
        .post(this.configService.getUrl(this.configService.getRoute().signUp),signUp));
  }
}
