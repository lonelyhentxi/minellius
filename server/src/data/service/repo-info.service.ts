import {Injectable} from "@nestjs/common";
import {Repository, Like} from "typeorm";
import {InjectRepository} from "@nestjs/typeorm";
import {QueryRepoInfoDto} from "../dto/query-repo-info.dto";
import {RepoInfoEntity} from "../../entity/repo-info.entity";
import {QueryLimitationDto} from "../dto/query-limitation.dto";
import {QueryHelperService} from "./query-helper.service";

@Injectable()
export class RepoInfoService {
    constructor(
        @InjectRepository(RepoInfoEntity)
        private readonly repoInfoRepo: Repository<RepoInfoEntity>,
        private readonly queryHelpService: QueryHelperService,
    ) {
    }

    async find(query: QueryRepoInfoDto, limitQuery: QueryLimitationDto): Promise<RepoInfoEntity[]> {
        let where = {};
        where = this.queryHelpService.genLikeQuery(where, "position", query.position);
        where = this.queryHelpService.genLikeQuery(where, "organization", query.organization);
        // const options  = {}
        return await this.repoInfoRepo.find({
            where: where,
            skip: limitQuery.skip,
            take: limitQuery.limit,
        });
    }

    async count(query: QueryRepoInfoDto): Promise<number> {
        let where = {};
        where = this.queryHelpService.genLikeQuery(where, "position", query.position);
        where = this.queryHelpService.genLikeQuery(where, "organization", query.organization);
        return await this.repoInfoRepo.count({
            where: where,
        });
    }
}