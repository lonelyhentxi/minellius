import { Module, Provider, DynamicModule } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataModule } from './data/data.module';
import { RoleModule } from './role';
import { AuthModule } from './auth';
import { customDbConfig } from './config';
import { CoreModule } from './core/core.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(customDbConfig),
    CoreModule,
    RoleModule,
    AuthModule,
    DataModule,
  ],
})
export class AppModule {
  static forRoot(options: { providers: Provider[] }): DynamicModule {
    return {
      module: AppModule,
      providers: [...options.providers],
      imports: [
        TypeOrmModule.forRoot(customDbConfig),
        CoreModule.forRoot(options),
        RoleModule.forRoot(options),
        AuthModule.forRoot(options),
        DataModule.forRoot(options)],
    };
  }
}
