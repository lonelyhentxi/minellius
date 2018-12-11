import {Column} from "typeorm";

export class QueryUserInfoDto{
    readonly watchStart?:number;
    readonly watchEnd?:number;
    readonly starStart?:number;
    readonly starEnd?:number;
    readonly forkStart?:number;
    readonly forkEnd?:number;
    readonly lang:string;
    readonly commits:string;
    readonly branches:string;
    readonly releases:string;
    readonly contributor:string;
    readonly tag:string;
}