import { DynamicModule, HttpModule, MiddlewareConsumer, Module, NestModule, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RoleModule, entities as coreEntities } from '../role';
import { authenticate } from 'passport';
import { configs } from './configs';
import { controllers } from './controllers';
import { entities } from './entities';
import { passportStrategies } from './passport';
import { services } from './services';
import { CoreModule } from '../core/core.module';

@Module({
  imports: [HttpModule, RoleModule, CoreModule, TypeOrmModule.forFeature([...coreEntities, ...entities])],
  controllers: [...controllers],
  providers: [...configs, ...services],
  exports: [...configs, ...services],
})
export class AuthModule implements NestModule {
  static forFeature(): DynamicModule {
    return {
      module: AuthModule,
      imports: [HttpModule, RoleModule, CoreModule],
      providers: [...services],
      exports: [...configs, ...services],
    };
  }

  static forRoot(options: { providers: Provider[] }): DynamicModule {
    return {
      module: AuthModule,
      imports: [HttpModule, RoleModule, CoreModule, TypeOrmModule.forFeature([...coreEntities, ...entities])],
      controllers: [...controllers],
      providers: [...configs, ...services, ...passportStrategies, ...options.providers],
      exports: [...configs, ...services],
    };
  }

  public configure(consumer: MiddlewareConsumer) {
    consumer.apply(authenticate('signup', { session: false, passReqToCallback: true })).forRoutes('api/auth/signup');
    consumer.apply(authenticate('signin', { session: false, passReqToCallback: true })).forRoutes('api/auth/signin');
    consumer
      .apply(
        authenticate('minellius-github-signin', { session: false, passReqToCallback: true }))
      .forRoutes('api/auth/github/token');
    consumer
      .apply(authenticate('minellius-github-bind', { session: false, passReqToCallback: true }))
      .forRoutes('api/bind/github/token');
  }
}
