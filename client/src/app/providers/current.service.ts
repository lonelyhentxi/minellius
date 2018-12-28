import {Injectable} from '@angular/core';
import * as lodash from 'lodash';
import {ConfigService} from './config.service';
import {HttpClient} from '@angular/common/http';
import {isNil} from 'lodash';
import {tap} from 'rxjs/operators';
import {OutCurrentRecordDto} from '../dtos/out-current-record.dto';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentService {

  currentRecords: Map<string, any>;

  constructor(
    private readonly configService: ConfigService,
    private readonly httpClient: HttpClient,
  ) {
    this.currentRecords = new Map();
  }

  private transformFormatDateMap(dateMap: { [key: string]: number }): (number[])[] {
    return Object.values(lodash.groupBy(Object.entries(dateMap), val => val[0].slice(0, 4)))
      .map((year: [string, number][]) => year.map(month => month[1])
      );
  }

  async getRepoCreateAtList(): Promise<(number[])[]> {
    const createatMap = await this.getCurrentRecord('create_time');
    return this.transformFormatDateMap(createatMap);
  }


  async getRepoPushAtList(): Promise<(number[])[]> {
    const pushAtMap = await this.getCurrentRecord('pushed_time');
    return this.transformFormatDateMap(pushAtMap);
  }


  async getUserLocationList(): Promise<{ name: string, value: number }[]> {
    const raw: { [key: string]: number } = await this.getCurrentRecord('country_dic');
    return Object.entries(raw).map(r => ({value: r[1], name: r[0]}));
  }


  async getRepoLang() {
    const raw: { [key: string]: number } = await this.getCurrentRecord('repo_lang_dic');
    const seriesData = Object.entries(raw).map(r => ({value: r[1], name: r[0]}));
    return {
      seriesData: seriesData,
      legendData: seriesData.map(val => val.name),
      selected: [seriesData.map(() => true)],
    };
  }


  async getRepoStarList(): Promise<{ dataAxis: string[], dataSeries: number[] }> {
    const raw: { [key: string]: number } = await this.getCurrentRecord('star_dic');
    const [dataAxis, dataSeries] = lodash.zip(...Object.entries(raw));
    return {
      dataAxis,
      dataSeries
    };
  }

  async getRepoForkList(): Promise<{ dataAxis: string[], dataSeries: number[] }> {
    const raw: { [key: string]: number } = await this.getCurrentRecord('forks_dic');
    const [dataAxis, dataSeries] = lodash.zip(...Object.entries(raw));
    return {
      dataAxis,
      dataSeries
    };
  }

  async getRepoLicenseGraph() {
    const raw: { [key: string]: number } = await this.getCurrentRecord('license_dic');
    const licenseMap = {
      'apache-2.0': 'Apache 2.0',
      'agpl-3.0': 'GNU General Public License 3.0',
      'agpl-2.0': 'GNU General Public License 2.0',
      'zlib': 'Zlib License',
      'wtfpl': 'Do What The F*ck You Want To Public License',
      'unlicense': 'The Unlicense',
      'osl-3.0': 'Open Software License',
      'ofl-1.1': 'SIL Open Font License',
      'ms-pl': 'Microsoft Public License',
      'mpl-2.0': 'Mozilla Public License',
      'mit': 'MIT License',
      'lgpl-3.0': 'GNU Lesser General Public License 3.0',
      'lgpl-2.1': 'GNU Lesser General Public License 2.0',
      'isc': 'ISC License',
      'gpl-3.0': 'GNU General Public License 3.0',
      'gpl-2.0': 'GNU General Public License 2.0',
      'epl-2.0': 'Eclipse Public License 2.0',
      'epl-1.0': 'Eclipse Public License 1.0',
      'cc-by-sa-4.0': 'Creative Commons Attribution Share Alike 4.0 International',
      'cc-by-4.0': 'Creative Commons Attribution 4.0 International',
      'cc0-1.0': 'Creative Commons Zero v1.0 Universal',
      'bsl-1.0': 'Boost Software License 1.0',
      'bsd-3-clause-clear': 'BSD-3-Clause-Clear',
      'bsd-3-clause': 'BSD-3-Clause',
      'bsd-2-clause': 'BSD-2-Clause',
      'artistic-2.0': 'Artistic License 2.0'
    };
    const familyMap = {
      'MIT License': 'MIT Family',
      'Apache 2.0': 'Apache Family',
      'BSD-2-Clause': 'BSD Clause Family',
      'BSD-3-Clause': 'BSD Clause Family',
      'BSD-3-Clause-Clear': 'BSD Clause Family',
      'Creative Commons Zero v1.0 Universal': 'Creative Commons Family',
      'Creative Commons Attribution 4.0 International': 'Creative Commons Family',
      'Creative Commons Attribution Share Alike 4.0 International': 'Creative Commons Family',
      'GNU General Public License 2.0': 'GNU General Public Family',
      'GNU General Public License 3.0': 'GNU General Public Family',
      'GNU Lesser General Public License 2.1': 'GNU General Public Family',
      'GNU Lesser General Public License 3.0': 'GNU General Public Family',
      'GNU Affero General Public License 3.0': 'GNU General Public Family',
      'Eclipse Public License 2.0': 'Eclipse Public Family',
      'Eclipse Public License 1.0': 'Eclipse Public Family',
      'Zlib License': 'Other Family',
      'Do What The F*ck You Want To Public License': 'Other Family',
      'Other': 'Other Family',
      'The Unlicense': 'Other Family',
      'Open Software License': 'Other Family',
      'SIL Open Font License': 'Other Family',
      'Microsoft Public License': 'Other Family',
      'Mozilla Public License': 'Other Family',
      'ISC License': 'Other Family',
      'Boost Software License 1.0': 'Other Family',
      'Artistic License 2.0': 'Other Family'
    };
    const dataSource: { [key: string]: { [key: string]: number } } = {};
    Object.entries(raw).forEach(r => {
      const key = r[0];
      const value = r[1];
      const name = licenseMap[key] ? licenseMap[key] : 'Other';
      const family = familyMap[name];
      if (!dataSource[family]) {
        dataSource[family] = {};
      }
      dataSource[family][name] = value;
    });

    interface LicenseListItem {
      name: string;
      isLicense: boolean;
      category: string;
      value: number;
    }

    const licenses: LicenseListItem[] = [];
    for (const licenseFamily of Object.keys(dataSource)) {
      const family = dataSource[licenseFamily];
      let sum = 0;
      for (const license of Object.keys(family)) {
        const value = family[license];
        sum += value;
        licenses.push({
          name: license,
          isLicense: true,
          category: licenseFamily,
          value: value
        });
      }
      licenses.push({
        name: licenseFamily,
        isLicense: false,
        category: licenseFamily,
        value: sum
      });
    }
    return licenses;
  }

  async getUserFollowerList(): Promise<{ name: string, value: number }[]> {
    const raw: { [key: string]: number } = await this.getCurrentRecord('size_dic');
    return Object.entries(raw).map(r => ({value: r[1], name: r[0]}));
  }

  async getIssueCommentList(): Promise<[string, number][]> {
    const raw: { [key: string]: number } = await this.getCurrentRecord('comments_dic');
    return (Object.entries(raw) as [string, number][]);
  }

  async getUserRepoList(): Promise<[string[], number[]]> {
    const raw: { [key: string]: number } = await this.getCurrentRecord('repos_dic');
    return lodash.zip(...Object.entries(raw));
  }

  async getRepoSizeList(): Promise<{ value: number, name: string }[]> {
    const raw: { [key: string]: number } = await this.getCurrentRecord('size_dic');
    return Object.entries(raw).map(r => ({value: r[1], name: r[0]}));
  }

  getCurrentRecordsFromNetwork() {
    const me = this;
    return (this.httpClient
      .get(this.configService.getUrl(
        this.configService.getRoute().currentRecords)) as Observable<OutCurrentRecordDto[]>)
      .pipe(tap((res) => {
        res.forEach(r => me.currentRecords.set(r.keyword, JSON.parse(r.value)));
      }));
  }

  async getCurrentRecord(key: string) {
    const record = this.currentRecords.get(key);
    const me = this;
    if (isNil(record)) {
      await me.getCurrentRecordsFromNetwork()
        .toPromise();
    }
    return this.currentRecords.get(key);
  }
}

