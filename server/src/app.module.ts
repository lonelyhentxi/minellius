import { Module } from '@nestjs/common';
import { ConfigModule,ConfigService } from './configs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataModule } from './data/data.module';
import { CoreModule } from './core';
import { AuthModule } from './auth';
import { RoleModule } from './role';

@Module({
  imports: [
    ConfigModule,
    CoreModule,
    RoleModule,
    AuthModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const config = configService.get();
        return {
          logging: config.NODE_ENV==='development',
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
    DataModule,
  ],
})
export class AppModule {

}
