import { ExecutionContext, Injectable, Logger } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { AuthGuard } from '@nestjs/passport';
import { User } from '../entities/user.entity';

@Injectable()
export class AccessGuard extends AuthGuard('minellius-jwt') {
  constructor(private readonly reflector: Reflector) {
    super({property:'user'});
  }

  async canActivate(context: ExecutionContext) {
    try {
      await super.canActivate(context);
    } catch (error) {
    }
    const roles = this.reflector.get<string[]>('roles', context.getHandler());
    const permissions = this.reflector.get<string[]>('permissions', context.getHandler());
    const request = context.switchToHttp().getRequest();
    if(!request||!request.user||!request.user.username) {
      Logger.log(`no that user`, AccessGuard.name);
      return false;
    }
    const user: User = request.user;
    Logger.log(`${JSON.stringify(user.username)} need ${roles?roles:'no'} role, ${permissions?permissions:'no'} permission`, AccessGuard.name);
    const hasRole = roles ? roles.filter(roleName => user && user instanceof User && user[roleName]).length > 0 : null;
    const hasPermission = permissions ? user && user instanceof User && user.checkPermissions(permissions) : null;
    return hasRole === true || hasPermission === true || (hasRole === null && hasPermission === null);
  }
}
