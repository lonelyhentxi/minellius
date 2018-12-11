import {Injectable} from "@nestjs/common";
import {Repository, LessThan, MoreThan, Equal, Between, Like} from "typeorm";
import { InjectRepository } from '@nestjs/typeorm'
import {QueryRepoInfoDto} from "../dto/query-repo-info.dto";
import {isNil} from 'lodash';
import {options} from "tsconfig-paths/lib/options";
import {RepoInfoEntity} from "../../entity/repo-info.entity";

@Injectable()
export class RepoInfoService {
    constructor(
        @InjectRepository(RepoInfoEntity)
        private readonly repoInfoRepo: Repository<RepoInfoEntity>
    ){}

    async findByPosition(query:QueryRepoInfoDto): Promise<RepoInfoEntity[]>{
        const where = {
            position: [Like(query.position)]
        };
        return await this.repoInfoRepo.find({
            where:where
        })
    }

    async findByOrganization(query:QueryRepoInfoDto): Promise<RepoInfoEntity[]>{
        const where = {
            organization: [Like(query.organization)]
        };
        return await this.repoInfoRepo.find({
            where:where
        })
    }
}