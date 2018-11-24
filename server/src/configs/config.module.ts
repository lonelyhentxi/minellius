import { Module } from '@nestjs/common';
import { ConfigService } from './services/config.service';
import { UtilModule } from '../util/util.module';

@Module({
  imports: [UtilModule],
  providers:[ConfigService],
  exports:[ConfigService],
})
export class ConfigModule {

}