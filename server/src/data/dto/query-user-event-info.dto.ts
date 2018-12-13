import {Entity} from "typeorm";
import {IsDate} from "class-validator";

@Entity()
export class QueryUserEventInfoDto{
    @IsDate()
    readonly eventTimeStart?:Date;

    @IsDate()
    readonly eventTimeEnd?:Date;


    readonly eventType:number[];
}