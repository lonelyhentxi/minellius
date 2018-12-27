import { Module, HttpModule, Provider, DynamicModule } from '@nestjs/common';
import { PeriodEventController } from './controllers/period-event.controller';
import { PeriodEventService } from './services/period-event.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PeriodRepoEventEntity } from './entities/period-repo-event.entity';
import { PeriodOrgEventEntity } from './entities/period-org-event.entity';
import { PeriodUserEventEntity } from './entities/period-user-event.entity';
import { CoreModule } from '../core/core.module';
import { AuthModule, passportStrategies } from '../auth';
import { RoleModule } from '../role';
import { PassportModule } from '@nestjs/passport';
import { CurrentRecordService } from './services/current-record.service';
import { CurrentRecordController } from './controllers/current-record.controller';
import { CurrentRecordEntity } from './entities/current-record.entity';

@Module({
  imports: [
    HttpModule,
    PassportModule,
    TypeOrmModule
      .forFeature([
        PeriodRepoEventEntity,
        PeriodOrgEventEntity,
        PeriodUserEventEntity,
        CurrentRecordEntity,
        ],
      ),
    CoreModule,
    RoleModule,
    AuthModule,
  ],
  providers: [PeriodEventService,CurrentRecordService],
  controllers: [PeriodEventController,CurrentRecordController],
})
export class DataModule {
  static forRoot(options: { providers: Provider[] }): DynamicModule {
    return {
      module: DataModule,
      imports: [
        HttpModule,
        PassportModule.register({
          defaultStrategy: 'minellius-jwt',
          property: 'user',
          session: false,
        }),
        TypeOrmModule
          .forFeature([
            PeriodRepoEventEntity,
            PeriodOrgEventEntity,
            PeriodUserEventEntity,
            CurrentRecordEntity,
            ],
          ),
        CoreModule,
        RoleModule,
        AuthModule,
      ],
      providers: [PeriodEventService,CurrentRecordService, ...options.providers, ...passportStrategies],
      controllers: [PeriodEventController,CurrentRecordController],
    };
  }
}
