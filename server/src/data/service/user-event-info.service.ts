import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import { InjectRepository } from '@nestjs/typeorm'
import {UserEventInfoEntity} from "../../entity/user-event-info.entity";
import {QueryUserEventInfoDto} from "../dto/query-user-event-info.dto";
import {QueryLimitationDto} from "../dto/query-limitation.dto";
import {QueryHelperService} from "./query-helper.service";

@Injectable()
export class UserEventInfoService {
    constructor(
        @InjectRepository(UserEventInfoEntity)
        private readonly userEventInfoRepo: Repository<UserEventInfoEntity>,
        private readonly queryHelperService: QueryHelperService,
    ) {
    }

    async find(query: QueryUserEventInfoDto, limitQuery: QueryLimitationDto): Promise<UserEventInfoEntity[]> {
        let where = {};
        where = this.queryHelperService.genScopeQuery(where, "eventTime", query.eventTimeStart, query.eventTimeEnd);
        where = this.queryHelperService.genIterableQuery(where, "eventType", query.eventType);
        return await this.userEventInfoRepo.find({
            where: where,
            skip: limitQuery.skip,
            take: limitQuery.limit,
        });
    }

    async count(query: QueryUserEventInfoDto): Promise<number> {
        let where = {};
        where = this.queryHelperService.genScopeQuery(where, "eventTime", query.eventTimeStart, query.eventTimeEnd);
        where = this.queryHelperService.genIterableQuery(where, "eventType", query.eventType);
        return await this.userEventInfoRepo.count({
            where: where,
        });
    }
}