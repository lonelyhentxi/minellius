import {Test, TestingModule} from "@nestjs/testing";
import {UserEventInfoService} from "./user-event-info.service";
import * as moment from "moment";

describe("UserEventInfoService", async () => {
    let app: TestingModule;
    beforeAll(async () => {
        app = await Test.createTestingModule({
            controllers: [],
            providers: [UserEventInfoService]
        }).compile();
    });

    describe("select test", () => {

        it("should return true answer", async () => {
            const userEventInfoService = app.get<UserEventInfoService>(UserEventInfoService);
            expect(await userEventInfoService.find({
                    eventTimeStart: moment("2014-01").toDate(),
                    eventTimeEnd: moment("2014-01").toDate(),
                    eventType: [0, 1],
                },
                {
                    skip:10,
                    limit:10
                })).toEqual("[]");
        });
    });
});