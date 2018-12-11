import {Entity} from "typeorm";

@Entity()
export class QueryUserEventInfoDto{
    readonly eventTimeStart?:Date;
    readonly eventTimeEnd?:Date;
    readonly eventType:number;
}