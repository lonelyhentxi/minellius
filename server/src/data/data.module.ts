import {Module} from "@nestjs/common";
import {TypeOrmModule} from "@nestjs/typeorm";
import {QueryHelperService} from "./service/query-helper.service";

@Module({
    imports:[
    ],
    providers: [QueryHelperService]
})
export class DataModule {
}