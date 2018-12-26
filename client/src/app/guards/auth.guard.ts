import {Injectable} from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild, UrlTree, Router} from '@angular/router';
import {Observable} from 'rxjs';
import {UserService} from '../providers/user.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(
    private readonly userService: UserService,
    private readonly router: Router,
  ) {
  }

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    const url = state.url;
    console.log(url);
    if (url.startsWith('/layout')) {
      if(!this.userService.loggedIn) {
        this.router.navigateByUrl('/');
      }
      return this.userService.loggedIn;
    } else {
      if(this.userService.loggedIn) {
        this.router.navigateByUrl('/layout');
      }
      return !this.userService.loggedIn;
    }
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot, state: RouterStateSnapshot):
    Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.canActivate(childRoute, state);
  }
}
