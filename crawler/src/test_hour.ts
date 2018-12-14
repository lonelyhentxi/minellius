import * as Crawler from "crawler";
import * as _ from "lodash";
import * as fse from "fs-extra";
import * as path from 'path'


const repoList: Set<string> = new Set(fse.readJSONSync(path.join(__dirname, '..', 'resource', "reponew1.json")));
const warnLogPath = path.join(__dirname, "..", 'log', 'warn.log')
const successLogPath = path.join(__dirname, "..", 'log', 'success.log')

const c = new Crawler({
    maxConnections: 10,
    rateLimit: 100,
    // This will be called for each crawled page
    callback: function (error, res, done) {
        if (error) {
            console.log(error);
        } else {
            let $ = res.$;
            // $ is Cheerio by default
            //a lean implementation of core jQuery designed specifically for the server
            console.log($("title").text());
        }
        done();
    }
});

const downloadRepo = (c: Crawler, repo: string) => {
    const uri = "https://github.com/" + repo;
    c.queue([{
        uri: uri,
        timeout: 1000,
        jQuery: true,
        callback: function (error, res, done) {

            const action = async () => {
                if (res.statusCode === 404) {
                    const warnContent = `${repo}:${404}\n`;
                    console.debug(warnContent);
                    await fse.appendFile(warnLogPath, warnContent, { encoding: 'utf-8' });
                }
                else if (error) {
                    const warnContent = `${repo}:${error}\n`;
                    console.debug(warnContent);
                    await fse.appendFile(warnLogPath, warnContent, { encoding: 'utf-8' });
                } else {
                    const file = path.join(__dirname, '..', 'resource', `${repo}.html`);
                    const dir = path.dirname(file);
                    fse.ensureDirSync(dir);
                    fse.createWriteStream(file).write(res.body);
                    const successContent = repo + '\n';
                    console.info(successContent);
                    await fse.appendFile(successLogPath, successContent, { encoding: 'utf-8' });
                }
            };
            action()
                .then(() => { })
                .catch(err => {
                    try {
                        const warnContent = `${repo}:${err}\n`;
                        console.warn(warnContent);
                        fse.appendFileSync(warnLogPath, warnContent, { encoding: 'utf-8' });
                    } catch {
                    }
                }).
                finally(() => done())
        }
    }]);
};

fse.ensureFileSync(warnLogPath);
fse.ensureFileSync(successLogPath);
fse.appendFileSync(warnLogPath, `-----------${Date.now()}-------------------------\n`, { encoding: 'utf-8' });
fse.appendFileSync(successLogPath, `-----------${Date.now()}-------------------------\n`, { encoding: 'utf-8' });
for (const repo of repoList) {
    downloadRepo(c, repo);
}