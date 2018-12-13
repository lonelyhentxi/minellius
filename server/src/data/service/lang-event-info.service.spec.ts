import {Test, TestingModule} from "@nestjs/testing";
import {LangEventInfoService} from "./lang-event-info.service";
import * as moment from "moment";

describe("LangEventInfoService", async () => {
    let app: TestingModule;
    beforeAll(async () => {
        app = await Test.createTestingModule({
            controllers: [],
            providers: [LangEventInfoService]
        }).compile();
    });
    describe("select test", () => {

        it("should return true answer", async () => {
            const langEventInfoService = app.get<LangEventInfoService>(LangEventInfoService);
            expect(await langEventInfoService.find({
                periodStart: moment("2014-01").toDate(),
                periodEnd: moment("2014-01").toDate(),
                eventType: [0, 1],
            },
            {
                skip:10,
                limit:10
            })).toEqual("[]");
        });
    });
});