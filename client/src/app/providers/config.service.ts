import { Injectable } from '@angular/core';

@Injectable()
export class ConfigService {

  config = {
    SERVER_HOST: 'http://192.168.6.236:6080/api',
    PERIOD_EVENT: '/period-events',
    QUERY: '/query',
    COUNT: '/count',
  };

  constructor() { }

  get() {
    return this.config;
  }
}
