import { Injectable } from '@angular/core';
import {ElectronService} from './electron.service';

@Injectable()
export class CustomTranslateService {

  defaultLangPath = 'defaultLang';

  constructor(private readonly electron: ElectronService) {}

  loadLang() {
    const lang = localStorage.getItem(this.defaultLangPath);
    if (lang) {
      return lang;
    } else if(this.electron.remote.app.getLocale().match(/zh|cn/)) {
      return 'zh-cn';
    } else {
      return 'en';
    }
  }

  setLang(lang: string) {
    localStorage.setItem(this.defaultLangPath,lang);
  }
}
