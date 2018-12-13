import {Entity} from "typeorm";

@Entity()
export class QueryLimitationDto {
    readonly skip?: number;
    readonly limit?: number;
}