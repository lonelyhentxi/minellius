import {Injectable} from '@angular/core';

const DEV_HOST = '127.0.0.1:6080';
const DEBUG_HOST = '127.0.0.1:6081';
const PROD_HOST = 's2hw.evernightfireworks.com';
const HTTPS = 'https://';
const HTTP = 'http://';

export const NOW_HOST = PROD_HOST;

@Injectable()
export class ConfigService {

  private config = {
    PROTOCOL: HTTPS,
    SERVER_HOST: NOW_HOST,
    API_BASE: '/api',
    PERIOD_EVENT: '/period-events',
    QUERY: '/query',
    COUNT: '/count',
    AUTH: '/auth',
    LOGIN: '/signin',
    SIGNUP: '/signup',
    GITHUB: '/github',
    BIND: '/bind',
    TOKEN: '/token',
    URI: '/uri',
    ACCOUNTS: '/accounts',
    UNBIND: '/unbind',
    ACCOUNT: '/account',
    UPDATE: '/update',
    CURRENT_RECORD: '/current-record',
    CURRENT_RECORDS: '/current-records'
  };

  private route = {
    login: this.config.SERVER_HOST + this.config.API_BASE + this.config.AUTH + this.config.LOGIN,
    periodEventQuery: this.config.SERVER_HOST + this.config.API_BASE + this.config.PERIOD_EVENT + this.config.QUERY,
    periodEventCount: this.config.SERVER_HOST + this.config.API_BASE + this.config.PERIOD_EVENT + this.config.COUNT,
    signUp: this.config.SERVER_HOST + this.config.API_BASE + this.config.AUTH + this.config.SIGNUP,
    githubUri: this.config.SERVER_HOST + this.config.API_BASE + this.config.AUTH + this.config.GITHUB + this.config.URI,
    githubBind: this.config.SERVER_HOST + this.config.API_BASE + this.config.BIND + this.config.GITHUB,
    githubSignIn: this.config.SERVER_HOST + this.config.API_BASE + this.config.AUTH + this.config.GITHUB + this.config.LOGIN,
    oauthAccounts: this.config.SERVER_HOST + this.config.API_BASE + this.config.BIND + this.config.ACCOUNTS,
    unbind: this.config.SERVER_HOST + this.config.API_BASE + this.config.BIND + this.config.UNBIND,
    accountUpdate: this.config.SERVER_HOST + this.config.API_BASE + this.config.ACCOUNT + this.config.UPDATE,
    currentRecords: this.config.SERVER_HOST + this.config.API_BASE + this.config.CURRENT_RECORD + this.config.CURRENT_RECORDS
  };

  constructor() {
  }

  getConfig() {
    return this.config;
  }

  getRoute() {
    return this.route;
  }

  getUrl(route: string) {
    return this.getConfig().PROTOCOL + route;
  }
}
