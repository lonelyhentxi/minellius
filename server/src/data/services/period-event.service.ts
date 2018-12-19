import { Injectable } from '@nestjs/common';
import { Repository, Equal } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { PeriodRepoEventEntity } from '../entities/period-repo-event.entity';
import { PeriodUserEventEntity } from '../entities/period-user-event.entity';
import { PeriodOrgEventEntity } from '../entities/period-org-event.entity';
import { CreatePeriodEventQueryDto } from '../dto/create-period-event-query.dto';
import { PeriodEventEntityType } from '../constants/period-event-entity.constant';
import { orderParse } from '../functools/database.functool';
import { equalPipe, pipeBuild } from '../functools/orm-option-pipe-builder.functool';
import dayjs = require('dayjs');

@Injectable()
export class PeriodEventService {
  constructor(
    @InjectRepository(PeriodRepoEventEntity)
    private readonly periodRepoEventRepository: Repository<PeriodRepoEventEntity>,
    @InjectRepository(PeriodUserEventEntity)
    private readonly periodUserEventRepository: Repository<PeriodUserEventEntity>,
    @InjectRepository(PeriodOrgEventEntity)
    private readonly periodOrgEventRepository: Repository<PeriodOrgEventEntity>,
  ) {
  }

  async find(
    createPeriodEventQuery: CreatePeriodEventQueryDto):
    Promise<
      PeriodUserEventEntity[] |
      PeriodOrgEventEntity[] | PeriodRepoEventEntity[]> {
    let repo: Repository<PeriodRepoEventEntity> |
      Repository<PeriodUserEventEntity> | Repository<PeriodOrgEventEntity>;
    if (createPeriodEventQuery.entityType === PeriodEventEntityType.User) {
      repo = this.periodUserEventRepository;
    } else if (createPeriodEventQuery.entityType === PeriodEventEntityType.Repo) {
      repo = this.periodRepoEventRepository;
    } else {
      repo = this.periodOrgEventRepository;
    }

    const option = {
      where: pipeBuild({},
        equalPipe('period', createPeriodEventQuery.period, (val)=>Equal(dayjs(val).format('YYYY-MM'))),
        equalPipe('name', createPeriodEventQuery.name, Equal),
        equalPipe('eventType', createPeriodEventQuery.eventType, Equal),
      ),
      order: pipeBuild({},
        equalPipe('period',
          orderParse(createPeriodEventQuery.periodOrderAsc, true)),
        equalPipe('num',
          orderParse(createPeriodEventQuery.numOrderDesc, false)),
      ),
      take: createPeriodEventQuery.take,
      skip: createPeriodEventQuery.skip,
    };
      return repo.find(option);
  }
}