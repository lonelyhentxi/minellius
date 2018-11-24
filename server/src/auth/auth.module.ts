import {
  DynamicModule,
  HttpModule,
  MiddlewareConsumer,
  Module,
  NestModule,
  Provider,
} from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { authenticate } from 'passport';
import { controllers } from './controllers';
import { entities } from './entities';
import { passportStrategies } from './passport';
import { services } from './services';
import { ConfigModule } from '../configs';
import { RoleModule,entities as roleEntities } from '../role';

@Module({
  imports: [
    HttpModule,
    ConfigModule,
    RoleModule,
    TypeOrmModule.forFeature([...roleEntities,...entities]),
  ],
  controllers: [...controllers],
  providers: [...services,...passportStrategies],
  exports: [...services],
})
export class AuthModule implements NestModule {

  public configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        authenticate('signup', { session: false, passReqToCallback: true }),
      )
      .forRoutes('api/auth/signup');
    consumer
      .apply(
        authenticate('signin', { session: false, passReqToCallback: true }),
      )
      .forRoutes('api/auth/signin');
  }
}
