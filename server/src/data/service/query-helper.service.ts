import {Injectable} from "@nestjs/common";
import { isNil } from "lodash";
import {In, Like} from "typeorm";

@Injectable()
export class QueryHelperService {
    constructor() {}

    genScopeQuery<T,Q>(query: Q,field: string, start:T,end:T): Q {
        const scope = {};
        if(!isNil(start)) {
            scope['afe'] =  start;
        }
        if(!isNil(end)) {
            scope['bfe'] = end;
        }
        if(!isNil(start)||!isNil(end)) {
            query[field] = scope;
        }
        return query;
    }

    genIterableQuery<T,Q>(query: Q,field:string,items:T[]):Q {
        const uniqueItems = new Set(items);
        if(!isNil(items)) {
            query[field] = In([...uniqueItems]);
        }
        return query;
    }

    genSingleQuery<T,Q>(query:Q, field:string, item:T):Q{
        if(!isNil(item)){
            query[field] = item;
        }
        return query;
    }

    genLikeQuery<T,Q>(query:Q, field:string, item:T):Q{
        if(!isNil(item)){
            query[field] = Like(item);
        }
        return query;
    }
}