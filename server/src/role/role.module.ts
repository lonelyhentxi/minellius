import { DynamicModule, Module, Provider } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { controllers } from './controllers';
import { entities } from './entities';
import { services } from './services';

@Module({
  imports: [TypeOrmModule.forFeature([...entities])],
  controllers: [...controllers],
  providers: [...services],
  exports: [ ...services],
})
export class RoleModule {
  static forFeature(): DynamicModule {
    return {
      module: RoleModule,
      providers: [...services],
      exports: [...services],
    };
  }

  static forRoot(options: {providers:Provider[]}): DynamicModule {
    return {
      module: RoleModule,
      imports: [TypeOrmModule.forFeature([...entities])],
      controllers: [...controllers],
      providers: [...services,...options.providers],
      exports: [...services],
    };
  }

}
