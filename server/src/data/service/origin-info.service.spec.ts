import {Test, TestingModule} from "@nestjs/testing";
import {OriginInfoService} from "./origin-info.service";
import * as moment from "moment";

describe("OriginInfoService", async () => {
    let app: TestingModule;
    beforeAll(async () => {
        app = await Test.createTestingModule({
            controllers: [],
            providers: [OriginInfoService]
        }).compile();
    });

    describe("select test", () => {

        it("should return true answer", async () => {
            const originInfoService = app.get<OriginInfoService>(OriginInfoService);
            expect(await originInfoService.find({
                eventTimeStart: moment("2014-01").toDate(),
                eventTimeEnd: moment("2014-01").toDate(),
                eventType: [0, 1],
                updateTimeStart: moment("2015-01").toDate(),
                updateTimeEnd: moment("2015-01").toDate(),
                mark: true,
            }, {
                skip: 10,
                limit: 10
            })).toEqual("[]");
        });
    });
});