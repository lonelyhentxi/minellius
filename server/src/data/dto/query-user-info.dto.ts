import {Entity} from "typeorm";

@Entity()
export class QueryUserInfoDto{
    readonly watchStart?:number;
    readonly watchEnd?:number;
    readonly starStart?:number;
    readonly starEnd?:number;
    readonly forkStart?:number;
    readonly forkEnd?:number;
    readonly lang:string;
    // readonly commits:number;
    // readonly branches:number;
    // readonly releases:number;
    // readonly contributor:number;
    readonly tag:string;
}