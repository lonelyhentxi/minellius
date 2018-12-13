import {Test, TestingModule} from "@nestjs/testing";
import {RepoInfoService} from "./repo-info.service";

describe("RepoInfoService", async () => {
    let app: TestingModule;
    beforeAll(async () => {
        app = await Test.createTestingModule({
            controllers: [],
            providers: [RepoInfoService]
        }).compile();
    });

    describe("select test", () => {

        it("should return true answer", async () => {
            const repoInfoService = app.get<RepoInfoService>(RepoInfoService);
            expect(await repoInfoService.find({
                position: "shenzhen",
                organization: "Google",
            }, {
                skip: 10,
                limit: 10
            })).toEqual("[]");
        });
    });
});