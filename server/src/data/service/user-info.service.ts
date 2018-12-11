import {Injectable} from "@nestjs/common";
import {Repository, LessThan, MoreThan, Equal, Between, Like} from "typeorm";
import {UserInfoEntity} from "../../entity/user-info.entity";
import {InjectRepository} from '@nestjs/typeorm'
import {QueryUserInfoDto} from "../dto/query-user-info.dto";
import {isNil} from "@nestjs/common/utils/shared.utils";


@Injectable()
export class UserInfoService{
    constructor(
        @InjectRepository(UserInfoEntity)
        private readonly userInfoRepo: Repository<UserInfoEntity>
    ){}

    async findByWatchStart(query:QueryUserInfoDto): Promise<UserInfoEntity[]>{
        const where = {
            watch: [MoreThan(query.watchStart)]
        };
        if(!isNil(query.watchEnd)){
            where.watch['bfe'] = query.watchEnd;
        }
        return await this.userInfoRepo.find({
            where:where
        })
    }

    async findByWatchEnd(query:QueryUserInfoDto): Promise<UserInfoEntity[]>{
        const where = {
            watch: [LessThan(query.watchEnd)]
        };
        if(!isNil(query.watchStart)){
            where.watch['afe'] = query.watchStart;
        }
        return await this.userInfoRepo.find({
            where:where
        })
    }

    async findBetweenWatch(query:QueryUserInfoDto): Promise<UserInfoEntity[]>{
        const where = {
            watch: [Between(query.watchStart, query.watchEnd)]
        };
        return await this.userInfoRepo.find({
            where:where
        })
    }

    async findByStarStart(query:QueryUserInfoDto): Promise<UserInfoEntity[]>{
        const where = {
            star: [MoreThan(query.starStart)]
        };
        if(!isNil(query.starEnd)){
            where.star['bfe'] = query.starEnd;
        }
        return await this.userInfoRepo.find({
            where:where
        })
    }

    async findByStarEnd(query:QueryUserInfoDto): Promise<UserInfoEntity[]>{
        const where = {
            star: [LessThan(query.starEnd)]
        };
        if(!isNil(query.starStart)){
            where.star['afe'] = query.starStart;
        }
        return await this.userInfoRepo.find({
            where:where
        })
    }

    async findBetweenStar(query:QueryUserInfoDto): Promise<UserInfoEntity[]>{
        const where = {
            star: [Between(query.starStart, query.starEnd)]
        };
        return await this.userInfoRepo.find({
            where:where
        })
    }

    async findByForkStart(query:QueryUserInfoDto): Promise<UserInfoEntity[]>{
        const where = {
            fork: [MoreThan(query.forkStart)]
        };
        if(!isNil(query.forkEnd)){
            where.fork['bfe'] = query.forkEnd;
        }
        return await this.userInfoRepo.find({
            where:where
        })
    }

    async findByForkEnd(query:QueryUserInfoDto): Promise<UserInfoEntity[]>{
        const where = {
            fork: [LessThan(query.forkEnd)]
        };
        if(!isNil(query.forkStart)){
            where.fork['afe'] = query.forkStart;
        }
        return await this.userInfoRepo.find({
            where:where
        })
    }

    async findBetweenFork(query:QueryUserInfoDto): Promise<UserInfoEntity[]>{
        const where = {
            fork: [Between(query.forkStart, query.forkEnd)]
        };
        return await this.userInfoRepo.find({
            where:where
        })
    }

    async findByLang(query:QueryUserInfoDto): Promise<UserInfoEntity[]>{
        const where = {
            lang:[Like(query.lang)]
        };
        return await this.userInfoRepo.find({
            where:where
        })
    }

    async findByCommits(query:QueryUserInfoDto): Promise<UserInfoEntity[]>{
        const where = {
            commits:[Like(query.commits)]
        }
        return await this.userInfoRepo.find({
            where:where
        })
    }

    async findByBranches(query:QueryUserInfoDto): Promise<UserInfoEntity[]>{
        const where = {
            branches:[Like(query.branches)]
        }
        return await this.userInfoRepo.find({
            where:where
        })
    }

    async findByReleases(query:QueryUserInfoDto): Promise<UserInfoEntity[]>{
        const where = {
            releases:[Like(query.releases)]
        }
        return await this.userInfoRepo.find({
            where:where
        })
    }

    async findByContributor(query:QueryUserInfoDto): Promise<UserInfoEntity[]>{
        const where = {
            contributor:[Like(query.contributor)]
        }
        return await this.userInfoRepo.find({
            where:where
        })
    }

    async findByTag(query:QueryUserInfoDto): Promise<UserInfoEntity[]>{
        const where = {
            tag:[Like(query.tag)]
        }
        return await this.userInfoRepo.find({
            where:where
        })
    }
}