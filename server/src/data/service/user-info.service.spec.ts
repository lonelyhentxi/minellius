import {Test, TestingModule} from "@nestjs/testing";
import {UserInfoService} from "./user-info.service";
import * as moment from "moment";
import {User} from "../../role";

describe("UserInfoService", async () => {
    let app: TestingModule;
    beforeAll(async () => {
        app = await Test.createTestingModule({
            controllers: [],
            providers: [UserInfoService]
        }).compile();
    });

    describe("select test", () => {

        it("should return true answer", async () => {
            const userInfoService = app.get<UserInfoService>(UserInfoService);
            expect(await userInfoService.find({
                    watchStart: 50,
                    watchEnd: 100,
                    starStart: 50,
                    starEnd: 100,
                    forkStart: 50,
                    forkEnd: 100,
                    lang: "python",
                    tag: "tensorflow"
                },
                {
                    skip:10,
                    limit:10
                })).toEqual("[]");
        });
    });
});