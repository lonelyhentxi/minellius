import {Injectable} from '@angular/core';
import {PeriodEventInterface} from '../interfaces/period-event.interface';
import {HttpClient} from '@angular/common/http';
import {ConfigService} from './config.service';
import {CreatePeriodEventQueryDto} from '../dtos/create-period-event-query.dto';
import {PeriodEventEntityType} from '../constants/period-event-entity.constant';
import {EventType} from '../constants/event-type.constant';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {pipeBuild, equalPipe} from '../functools/pipe-builder.functool';
import * as dayjs from 'dayjs';

@Injectable()
export class PeriodService {

  constructor(
    private readonly httpClient: HttpClient,
    private readonly configService: ConfigService,
  ) {
  }

  transformQuery(
    query: [string, PeriodEventEntityType, { key: 'num' | 'period', value: 'ascend' | 'descend' | null }, string, EventType],
    skip: number, take: number
  ): CreatePeriodEventQueryDto {
    const res: CreatePeriodEventQueryDto = pipeBuild({entityType: query[1]},
      equalPipe('period', query[0], val => dayjs(val).toISOString()),
      equalPipe('eventType', query[4]),
      equalPipe('name', query[3]),
      equalPipe('skip', skip),
      equalPipe('take', take)
    ) as CreatePeriodEventQueryDto;
    const {key, value} = query[2];
    if (key === 'num') {
      if (value === 'descend') {
        res.numOrderDesc = true;
      } else if (value === 'ascend') {
        res.numOrderDesc = false;
      }
    } else if (key === 'period') {
      if (value === 'descend') {
        res.periodOrderAsc = false;
      } else if (value === 'ascend') {
        res.periodOrderAsc = true;
      }
    }
    return res;
  }

  find(body: CreatePeriodEventQueryDto): Observable<PeriodEventInterface[]> {
    return (<Observable<PeriodEventInterface[]>>
      this.httpClient.post(this.configService.getUrl(this.configService.getRoute().periodEventQuery), body, {}))
      .pipe(map(res => res.map(val => {
          val.event = EventType[val.eventType];
          return val;
        }))
      ) as Observable<PeriodEventInterface[]>;
  }

  count(body: CreatePeriodEventQueryDto): Observable<number> {
    return this.httpClient
      .post(this.configService.getUrl(this.configService.getRoute().periodEventCount), body, {}) as Observable<number>;
  }
}
