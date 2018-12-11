import {Injectable} from "@nestjs/common";
import {Repository, LessThan, MoreThan, Equal, Between} from "typeorm";
import { InjectRepository } from '@nestjs/typeorm'
import {OriginInfoEntity} from "../../entity/origin-info.entity";
import {QueryOriginInfoDto} from "../dto/query-origin-info.dto";
import {isNil} from 'lodash';
import {options} from "tsconfig-paths/lib/options";

@Injectable()
export class OriginInfoService {
    constructor(
        @InjectRepository(OriginInfoEntity)
        private readonly originInfoRepo: Repository<OriginInfoEntity>
    ){}

    async findByEventTimeStart(query:QueryOriginInfoDto): Promise<OriginInfoEntity[]> {
        const where = {
            eventTime: [MoreThan(query.eventTimeStart)]
        };
        if(!isNil(query.eventTimeEnd)) {
            where.eventTime['bfe'] = query.eventTimeEnd;
        }
        return await this.originInfoRepo.find({
            where:where
        })
    }

    async findByEventTimeEnd(query:QueryOriginInfoDto): Promise<OriginInfoEntity[]> {
        const where = {
            eventTime: [LessThan(query.eventTimeEnd)]
        };
        if(!isNil(query.eventTimeStart)) {
            where.eventTime['afe'] = query.eventTimeStart;
        }
        return await this.originInfoRepo.find({
            where:where
        })
    }

    async findBetweenEventTime(query:QueryOriginInfoDto): Promise<OriginInfoEntity[]>{
        const where ={
            eventTime: [Between(query.eventTimeStart, query.eventTimeEnd)]
        };
        return await this.originInfoRepo.find({
            where:where
        })
    }

    async findByUpdateTimeStart(query:QueryOriginInfoDto): Promise<OriginInfoEntity[]> {
        const where = {
            updateTime: [LessThan(query.updateTimeEnd)]
        };
        if(!isNil(query.updateTimeStart)) {
            where.updateTime['afe'] = query.updateTimeStart;
        }
        return await this.originInfoRepo.find({
            where:where
        })
    }

    async findByUpdateTimeEnd(query:QueryOriginInfoDto): Promise<OriginInfoEntity[]> {
        const where = {
            updateTime: [MoreThan(query.updateTimeStart)]
        };
        if(!isNil(query.updateTimeEnd)){
            where.updateTime['bfe'] = query.updateTimeEnd;
        }
        return await this.originInfoRepo.find({
            where:where
        })
    }

    async findBetweenUpdateTime(query:QueryOriginInfoDto): Promise<OriginInfoEntity[]> {
        const where = {
            updateTime: [Between(query.updateTimeStart, query.updateTimeEnd)]
        };
        return await this.originInfoRepo.find({
            where:where
        })
    }

    async findByEventType(query:QueryOriginInfoDto): Promise<OriginInfoEntity[]> {
          const where = {
              eventType: [Equal(query.eventType)]
          };
          return await this.originInfoRepo.find({
              where:where
          })
    }

    async findByUserName(query:QueryOriginInfoDto): Promise<OriginInfoEntity[]> {
        const where = {
            userName: [Equal(query.userName)]
        };
        return await this.originInfoRepo.find({
            where:where
        })
    }

    async findByRepoName(query:QueryOriginInfoDto): Promise<OriginInfoEntity[]> {
        const where = {
            repoName: [Equal(query.repoName)]
        };
        return await this.originInfoRepo.find({
            where:where
        })
    }

    async findByMark(query:QueryOriginInfoDto): Promise<OriginInfoEntity[]> {
        const where = {
            mark: [Equal(query.mark)]
        };
        return await this.originInfoRepo.find({
            where:where
        })
    }


}