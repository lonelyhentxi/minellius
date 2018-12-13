import {Controller, Get, Query} from "@nestjs/common";
import {UserEventInfoService} from "../service/user-event-info.service";
import {plainToClass} from "class-transformer";
import {QueryUserEventInfoDto} from "../dto/query-user-event-info.dto";
import {QueryLimitationDto} from "../dto/query-limitation.dto";


@Controller('userEventInfo')
export class UserEventInfoController{
    constructor(private readonly service: UserEventInfoService){}
    @Get()
    async findAll(@Query() query){
        const queryUserEventInfo = plainToClass(QueryUserEventInfoDto, {query});
        const queryLimitation = plainToClass(QueryLimitationDto, {query});
        return await this.service.find(queryUserEventInfo, queryLimitation);
    }
}