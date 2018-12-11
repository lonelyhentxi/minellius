import {Injectable} from "@nestjs/common";
import {LangEventInfoEntity} from "../../entity/lang-event-info.entity";
import {Repository, LessThan, MoreThan, Equal, Between} from "typeorm";
import { InjectRepository } from '@nestjs/typeorm'
import {QueryLangEventInfoDto} from "../dto/query-lang-event-info.dto";
import {isNil} from 'lodash';
import {async} from "rxjs/internal/scheduler/async";

@Injectable()
export class LangEventInfoService{
    constructor(
        @InjectRepository(LangEventInfoEntity)
        private readonly langEventInfoRepo: Repository<LangEventInfoEntity>
    ){}

    async findByPeriodStart(query:QueryLangEventInfoDto): Promise<LangEventInfoEntity[]>{
        const where = {
            period: [MoreThan(query.periodStart)]
        };
        if(!isNil(query.periodEnd)){
            where.period['bfe'] = query.periodEnd
        }
        return await this.langEventInfoRepo.find({
            where:where
        })
    }

    async findByPeriodEnd(query:QueryLangEventInfoDto): Promise<LangEventInfoEntity[]>{
        const where = {
            period: [LessThan(query.periodEnd)]
        };
        if(!isNil(query.periodStart)){
            where.period['afe'] = query.periodStart
        }
        return await this.langEventInfoRepo.find({
            where:where
        })
    }

    async findBetweenPeriod(query:QueryLangEventInfoDto): Promise<LangEventInfoEntity[]>{
        const where = {
            period: [Between(query.periodStart, query.periodEnd)]
        };
        return await this.langEventInfoRepo.find({
            where:where
        })
    }

    async findByEventType(query:QueryLangEventInfoDto): Promise<LangEventInfoEntity[]> {
        const where = {
            eventType: [Equal(query.eventType)]
        };
        return await this.langEventInfoRepo.find({
            where:where
        })
    }

}