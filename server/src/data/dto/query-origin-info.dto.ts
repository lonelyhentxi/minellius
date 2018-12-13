import {Entity} from "typeorm";
import {IsDate, IsInt, Max, Min} from "class-validator";

@Entity()
export class QueryOriginInfoDto {
    @IsDate()
    readonly eventTimeStart?: Date;

    @IsDate()
    readonly eventTimeEnd?: Date;

    @IsInt()
    // @Min(0)
    // @Max(3)
    readonly eventType: number[];

    @IsDate()
    readonly updateTimeStart?: Date;

    @IsDate()
    readonly updateTimeEnd?: Date;

    readonly mark?: boolean;
}