import { Module } from '@nestjs/common';
import { CoreModule } from './core';
import { ConfigModule, ConfigService } from './configs';
import { AuthModule } from './auth';
import { RoleModule } from './role';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule
  ],
})
export class AppModule {
}
