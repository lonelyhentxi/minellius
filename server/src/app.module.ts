import { Module } from '@nestjs/common';
import { CoreModule } from './core';
import { ConfigModule, ConfigService } from './configs';
import { AuthModule } from './auth';
import { RoleModule } from './role';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule,
      TypeOrmModule.forRoot({
          name: "dataConnection",
          type: 'mysql',
          host: '127.0.0.1',
          port: 3306,
          username: 'root',
          password:  '',
          database: 'db_Minellius',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
      }),
    CoreModule,
    RoleModule,
    AuthModule,
  ],
})
export class AppModule {
}
