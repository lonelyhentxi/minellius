import {Column} from "typeorm";

export class QueryOriginInfoDto {
    readonly eventTimeStart?: Date;
    readonly eventTimeEnd?: Date;
    readonly eventType?: number;
    readonly userName: string;
    readonly repoName: string;
    readonly updateTimeStart?: Date;
    readonly updateTimeEnd?: Date;
    readonly mark?: boolean;
}