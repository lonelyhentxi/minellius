import {Controller, Get, Query, Request} from "@nestjs/common";
import {plainToClass} from "class-transformer";
import {QueryLangEventInfoDto} from "../dto/query-lang-event-info.dto";
import {QueryLimitationDto} from "../dto/query-limitation.dto";
import {LangEventInfoService} from "../service/lang-event-info.service";

@Controller('langEventInfo')
export class LangEventInfoController{
    constructor(private readonly service: LangEventInfoService,){}
    @Get()
    async findAll(@Query() query){
        const queryLangEventInfo = plainToClass(QueryLangEventInfoDto, {query});
        const queryLimitation = plainToClass(QueryLimitationDto, {query});
        return await this.service.find(queryLangEventInfo,queryLimitation);
    };
}