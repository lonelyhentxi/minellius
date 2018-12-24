import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {ElectronService} from '../../providers/electron.service';
import {DomSanitizer} from '@angular/platform-browser';

@Component({
  selector: 'app-helper',
  templateUrl: './helper.component.html',
  styleUrls: ['./helper.component.scss']
})
export class HelperComponent implements OnInit {

  constructor(
    private readonly electron: ElectronService,
    public readonly sanitizer: DomSanitizer,
    private readonly translator: TranslateService,
  ) {
  }

  ngOnInit() {

  }

  get content(): string {
    return this.translator.instant('FUNCTION.HELPER.CONTENT');
  }

  get version():string {
    if (process.env.npm_package_version) {
      return  'v ' + process.env.npm_package_version;
    } else {
      return '';
    }
  }

  openOurRepo() {
    this.electron.remote.shell.openExternal('https://github.com/lonelyhentai/minellius');
  }
}
