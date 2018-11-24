import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { controllers } from './controllers';
import { entities } from './entities';
import { services } from './services';
import { ConfigModule } from '../configs';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([...entities]),
  ],
  controllers: [...controllers],
  providers: [...services],
  exports: [...services],
})
export class RoleModule {}
