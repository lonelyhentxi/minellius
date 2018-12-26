import {Component} from '@angular/core';
import {ElectronService} from './providers/electron.service';
import {TranslateService} from '@ngx-translate/core';
import {AppConfig} from '../environments/environment';
import {slideInAnimation} from './animations/slide-in.animation';
import {isNil} from 'lodash';
import {CustomTranslateService} from './providers/custom-translate.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [slideInAnimation]
})
export class AppComponent {
  constructor(public electronService: ElectronService,
              private translate: TranslateService,
              private readonly customTranslator: CustomTranslateService,
  ) {
    const lang = customTranslator.loadLang();
    translate.setDefaultLang(lang);
    console.log('AppConfig', AppConfig);

    if (electronService.isElectron()) {
      console.log('Mode electron');
      console.log('Electron ipcRenderer', electronService.ipcRenderer);
      console.log('NodeJS childProcess', electronService.childProcess);
    } else {
      console.log('Mode web');
    }
  }


}
