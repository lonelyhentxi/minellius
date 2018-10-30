import { Module } from '@nestjs/common';
import { CoreModule } from './core';
import { ConfigModule, ConfigService } from './configs';
import { AuthModule } from './auth';
import { RoleModule } from './role';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const config = configService.get();
        return {
          type: config.DB_TYPE,
          host: config.DB_HOSTNAME,
          port: config.DB_PORT,
          username: config.DB_USERNAME,
          password: config.DB_PASSWORD,
          database: config.DB_NAME,
          entities: [__dirname +  "/**/*.entity{.ts,.js}"],
          synchronize: true,
        };
      },
    }),
    CoreModule,
    RoleModule,
    AuthModule,
  ],
})
export class AppModule {
}
