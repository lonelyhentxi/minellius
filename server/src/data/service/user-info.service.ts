import {Injectable} from "@nestjs/common";
import {Repository} from "typeorm";
import {UserInfoEntity} from "../../entity/user-info.entity";
import {InjectRepository} from '@nestjs/typeorm'
import {QueryUserInfoDto} from "../dto/query-user-info.dto";
import {QueryHelperService} from "./query-helper.service";
import {QueryLimitationDto} from "../dto/query-limitation.dto";


@Injectable()
export class UserInfoService{
    constructor(
        @InjectRepository(UserInfoEntity)
        private readonly userInfoRepo: Repository<UserInfoEntity>,
        private readonly queryHelperService: QueryHelperService,
    ){}

    async find(query:QueryUserInfoDto, limitQuery:QueryLimitationDto): Promise<UserInfoEntity[]>{
        let where = {};
        where = this.queryHelperService.genScopeQuery(where,"watch", query.watchStart, query.watchEnd);
        where = this.queryHelperService.genScopeQuery(where,"star", query.starStart, query.starEnd);
        where = this.queryHelperService.genScopeQuery(where,"fork", query.forkStart, query.forkEnd);
        where = this.queryHelperService.genLikeQuery(where,"lang", query.lang);
        where = this.queryHelperService.genLikeQuery(where,"tag", query.tag);
        return await this.userInfoRepo.find({
            where:where,
            skip:limitQuery.skip,
            take:limitQuery.limit,
        });
    }

    async count(query:QueryUserInfoDto): Promise<number>{
        let where = {};
        where = this.queryHelperService.genScopeQuery(where,"watch", query.watchStart, query.watchEnd);
        where = this.queryHelperService.genScopeQuery(where,"star", query.starStart, query.starEnd);
        where = this.queryHelperService.genScopeQuery(where,"fork", query.forkStart, query.forkEnd);
        where = this.queryHelperService.genLikeQuery(where,"lang", query.lang);
        where = this.queryHelperService.genLikeQuery(where,"tag", query.tag);
        return await this.userInfoRepo.count({
            where:where,
        });
    }
}