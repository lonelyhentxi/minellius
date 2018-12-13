import {Controller, Get, Query} from "@nestjs/common";
import {plainToClass} from "class-transformer";
import {QueryRepoInfoDto} from "../dto/query-repo-info.dto";
import {QueryLimitationDto} from "../dto/query-limitation.dto";
import {RepoInfoService} from "../service/repo-info.service";


@Controller("repoInfo")
export class RepoInfoController{
    constructor(private readonly service:RepoInfoService,) {}
    @Get()
    async findAll(@Query() query){
        const queryRepoInfo = plainToClass(QueryRepoInfoDto, {query});
        const queryLimitation = plainToClass(QueryLimitationDto, {query});
        return await this.service.find(queryRepoInfo, queryLimitation);
    }
}