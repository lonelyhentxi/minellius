import { Module } from '@nestjs/common';
import { PathService } from './path/path.service';

@Module({
  providers:[PathService],
  exports:[PathService],
})
export class UtilModule {

}