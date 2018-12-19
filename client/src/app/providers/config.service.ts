import {Injectable} from '@angular/core';

const DEV_HOST = 'http://127.0.0.1:6080/api';
const DEBUG_HOST = 'http://127.0.0.1:6081/api';
const PROD_HOST = 'https://minellius.evernightfireworks.com/api';

export const NOW_HOST = DEV_HOST;

@Injectable()
export class ConfigService {

  config = {
    SERVER_HOST: NOW_HOST,
    PERIOD_EVENT: '/period-events',
    QUERY: '/query',
    COUNT: '/count',
    AUTH: '/auth',
    LOGIN: '/signin'
  };

  constructor() {
  }

  get() {
    return this.config;
  }
}
