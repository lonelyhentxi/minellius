import {Entity} from "typeorm";
import {Length} from "class-validator";

@Entity()
export class QueryRepoInfoDto {
    @Length(0,50)
    readonly position: string;

    @Length(0,50)
    readonly organization: string;
}