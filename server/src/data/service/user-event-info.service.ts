import {Injectable} from "@nestjs/common";
import {Repository, LessThan, MoreThan, Equal, Between} from "typeorm";
import { InjectRepository } from '@nestjs/typeorm'
import {UserEventInfoEntity} from "../../entity/user-event-info.entity";
import {QueryUserEventInfoDto} from "../dto/query-user-event-info.dto";
import {isNil} from 'lodash';

@Injectable()
export class UserEventInfoService{
    constructor(
        @InjectRepository(UserEventInfoEntity)
        private readonly userEventInfoRepo: Repository<UserEventInfoEntity>
    ){}

    async findByEventTimeStart(query:QueryUserEventInfoDto): Promise<UserEventInfoEntity[]> {
        const where = {
            eventTime: [MoreThan(query.eventTimeStart)]
        };
        if(!isNil(query.eventTimeEnd)) {
            where.eventTime['bfe'] = query.eventTimeEnd;
        }
        return await this.userEventInfoRepo.find({
            where:where
        })
    }

    async findByEventTimeEnd(query:QueryUserEventInfoDto): Promise<UserEventInfoEntity[]> {
        const where = {
            eventTime: [LessThan(query.eventTimeEnd)]
        };
        if(!isNil(query.eventTimeStart)) {
            where.eventTime['afe'] = query.eventTimeStart;
        }
        return await this.userEventInfoRepo.find({
            where:where
        })
    }

    async findBetweenEventTime(query:QueryUserEventInfoDto): Promise<UserEventInfoEntity[]>{
        const where ={
            eventTime: [Between(query.eventTimeStart, query.eventTimeEnd)]
        };
        return await this.userEventInfoRepo.find({
            where:where
        })
    }

    async findByEventType(query:QueryUserEventInfoDto): Promise<UserEventInfoEntity[]>{
        const where = {
            eventType: [Equal(query.eventType)]
        };
        return await this.userEventInfoRepo.find({
            where:where
        })
    }
}