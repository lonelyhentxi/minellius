import {Column} from "typeorm";

export class QueryLangEventInfoDto{
    readonly periodStart?: Date;
    readonly periodEnd?: Date;
    readonly eventType: number;
}