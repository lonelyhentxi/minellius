import {Controller, Get, Query} from "@nestjs/common";
import {OriginInfoService} from "../service/origin-info.service";
import {plainToClass} from "class-transformer";
import {QueryOriginInfoDto} from "../dto/query-origin-info.dto";
import {QueryLimitationDto} from "../dto/query-limitation.dto";


@Controller('originInfoController')
export class OriginInfoController{
    constructor(private readonly service: OriginInfoService){}
    @Get()
    async findAll(@Query() query){
        const queryOriginInfo = plainToClass(QueryOriginInfoDto, {query});
        const queryLimitation = plainToClass(QueryLimitationDto, {query});
        return await this.service.find(queryOriginInfo, queryLimitation);
    }
}