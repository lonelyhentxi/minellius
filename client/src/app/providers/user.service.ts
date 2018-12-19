import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {SignInDto} from '../dtos/sign-in.dto';
import {Observable} from 'rxjs';
import {UserTokenDto} from '../dtos/user-token.dto';
import {tap} from 'rxjs/operators';

@Injectable()
export class UserService {

  userToken: UserTokenDto;

  constructor(
    private readonly httpClient: HttpClient,
    private readonly configService: ConfigService,
  ) {
  }

  private tokenStoragePath = 'access_token';

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

  public get loggedIn(): boolean {
    return this.getToken() !== null;
  }

  logIn(signIn: SignInDto, remember: boolean) {
    const config = this.configService.get();
    const me = this;
    return (<Observable<UserTokenDto>>this.httpClient.post(config.SERVER_HOST + config.AUTH + config.LOGIN, signIn))
      .pipe(tap(userToken => {
        me.setToken(userToken.token);
        me.userToken = userToken;
      }));
  }

  wrapBody(body:any):any {
    const res = body;
    res['user'] = this.userToken.user;
    return res;
  }
}
