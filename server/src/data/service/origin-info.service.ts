import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import { InjectRepository } from '@nestjs/typeorm'
import {OriginInfoEntity} from "../../entity/origin-info.entity";
import {QueryOriginInfoDto} from "../dto/query-origin-info.dto";
import {QueryHelperService} from "./query-helper.service";
import {QueryLimitationDto} from "../dto/query-limitation.dto";

@Injectable()
export class OriginInfoService {
    constructor(
        @InjectRepository(OriginInfoEntity)
        private readonly originInfoRepo: Repository<OriginInfoEntity>,
        private readonly queryHelperService: QueryHelperService,
    ){}

    async find(query: QueryOriginInfoDto, limitQuery: QueryLimitationDto): Promise<OriginInfoEntity[]> {
        let where = {};
        where = this.queryHelperService.genScopeQuery(where, "eventTime", query.eventTimeStart, query.eventTimeEnd);
        where = this.queryHelperService.genIterableQuery(where, "eventType", query.eventType);
        where = this.queryHelperService.genScopeQuery(where,"updateTime", query.updateTimeStart, query.updateTimeEnd);
        where = this.queryHelperService.genSingleQuery(where, "mark", query.mark)
        return await this.originInfoRepo.find({
            where:where,
            skip: limitQuery.skip,
            take: limitQuery.limit
        })
    }

    async count(query: QueryOriginInfoDto): Promise<number> {
        let where = {};
        where = this.queryHelperService.genScopeQuery(where, "eventTime", query.eventTimeStart, query.eventTimeEnd);
        where = this.queryHelperService.genIterableQuery(where, "eventType", query.eventType);
        where = this.queryHelperService.genScopeQuery(where,"updateTime", query.updateTimeStart, query.updateTimeEnd);
        where = this.queryHelperService.genSingleQuery(where, "mark", query.mark);
        return await this.originInfoRepo.count({
            where:where
        });
    }

}