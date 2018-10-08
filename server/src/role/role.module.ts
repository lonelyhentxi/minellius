import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { configs } from '../core/configs';
import { controllers } from './controllers';
import { entities } from './entities';
import { services } from './services';
import { CoreModule } from '../core';

@Module({
  imports: [CoreModule,TypeOrmModule.forFeature([...entities])],
  controllers: [...controllers],
  providers: [...configs, ...services],
  exports: [...configs, ...services],
})
export class RoleModule {}
