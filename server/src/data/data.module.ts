import { Module } from '@nestjs/common';
import { PeriodEventController } from './controllers/period-event.controller';
import { UtilModule } from '../util/util.module';
import { PeriodEventService } from './services/period-event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeriodRepoEventEntity } from './entities/period-repo-event.entity';
import { PeriodOrgEventEntity } from './entities/period-org-event.entity';
import { PeriodUserEventEntity } from './entities/period-user-event.entity';

@Module({
  imports: [
    UtilModule,
    TypeOrmModule
      .forFeature([
        PeriodRepoEventEntity,
        PeriodOrgEventEntity,
        PeriodUserEventEntity],
      )],
  providers: [PeriodEventService],
  controllers: [PeriodEventController],
})
export class DataModule {

}
