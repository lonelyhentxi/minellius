import {Test, TestingModule} from "@nestjs/testing";
import {LangEventInfoService} from "../service/lang-event-info.service";
import {PathService} from "../../util/path/path.service";
import {ConfigService} from "../../configs";

describe('LangEventInfoService', async ()=>{
    let app: TestingModule;
    beforeAll(async ()=>{
        app = await Test.createTestingModule({
            controllers: [],
            providers: [LangEventInfoService]
        }).compile();
    });

    describe('select test', ()=>{

        it('should return true answer', async ()=>{
            const langEventInfoService = app.get<LangEventInfoService>(LangEventInfoService);
            expect(await langEventInfoService.findByEventType({
                eventType: 0,
            })).toEqual()
        });
    })
})