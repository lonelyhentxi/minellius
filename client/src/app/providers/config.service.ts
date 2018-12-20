import {Injectable} from '@angular/core';

const DEV_HOST = '127.0.0.1:6080';
const DEBUG_HOST = '127.0.0.1:6081';
const PROD_HOST = 'minellius.evernightfireworks.com';
const HTTPS = 'https://';
const HTTP = 'http://';

export const NOW_HOST = DEV_HOST;

@Injectable()
export class ConfigService {

  private config = {
    PROTOCOL: HTTP,
    SERVER_HOST: NOW_HOST,
    API_BASE: '/api',
    PERIOD_EVENT: '/period-events',
    QUERY: '/query',
    COUNT: '/count',
    AUTH: '/auth',
    LOGIN: '/signin',
    SIGNUP: '/signup'
  };

  private route = {
    login: this.config.SERVER_HOST + this.config.API_BASE + this.config.AUTH + this.config.LOGIN,
    periodEventQuery: this.config.SERVER_HOST + this.config.API_BASE + this.config.PERIOD_EVENT + this.config.QUERY,
    periodEventCount: this.config.SERVER_HOST + this.config.API_BASE + this.config.PERIOD_EVENT + this.config.COUNT,
    signUp: this.config.SERVER_HOST + this.config.API_BASE + this.config.AUTH + this.config.SIGNUP,
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
    return this.getConfig().PROTOCOL+ route;
  }
}
