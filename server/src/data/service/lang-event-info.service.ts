import {Injectable} from "@nestjs/common";
import {LangEventInfoEntity} from "../../entity/lang-event-info.entity";
import {Repository} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {QueryLangEventInfoDto} from "../dto/query-lang-event-info.dto";
import {QueryHelperService} from "./query-helper.service";
import {QueryLimitationDto} from "../dto/query-limitation.dto";

@Injectable()
export class LangEventInfoService {
    constructor(
        @InjectRepository(LangEventInfoEntity)
        private readonly langEventInfoRepo: Repository<LangEventInfoEntity>,
        private readonly queryHelperService: QueryHelperService,
    ) {
    }

    async find(query: QueryLangEventInfoDto, limitQuery:QueryLimitationDto): Promise<LangEventInfoEntity[]> {
        let where = {};
        where = this.queryHelperService.genScopeQuery(where, "period", query.periodStart, query.periodEnd);
        where = this.queryHelperService.genIterableQuery(where, "eventType", query.eventType);
        return await this.langEventInfoRepo.find({
            where: where,
            skip: limitQuery.skip,
            take: limitQuery.limit,
        });
    }

    async count(query: QueryLangEventInfoDto): Promise<number> {
        let where = {};
        where = this.queryHelperService.genScopeQuery(where, "period", query.periodStart, query.periodEnd);
        where = this.queryHelperService.genIterableQuery(where, "eventType", query.eventType);
        return await this.langEventInfoRepo.count({
            where: where
        });
    }
}