import {Controller, Get, Query} from "@nestjs/common";
import {UserInfoService} from "../service/user-info.service";
import {plainToClass} from "class-transformer";
import {QueryUserInfoDto} from "../dto/query-user-info.dto";
import {QueryLimitationDto} from "../dto/query-limitation.dto";


@Controller('userInfo')
export class UserInfoController{
    constructor(private readonly service: UserInfoService){}
    @Get()
    async findAll(@Query() query){
        const queryUserInfo = plainToClass(QueryUserInfoDto, {query});
        const quertLimitation = plainToClass(QueryLimitationDto, {query});
        return await this.service.find(queryUserInfo, quertLimitation);
    }
}