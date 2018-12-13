import {Entity} from "typeorm";
import {IsDate, IsInt, Max, Min} from "class-validator";

@Entity()
export class QueryLangEventInfoDto{
    @IsDate()
    readonly periodStart?: Date;

    @IsDate()
    readonly periodEnd?: Date;

    @IsInt()
    @Min(0)
    @Max(3)
    readonly eventType: number[];
}
