import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import { isNil } from 'lodash';
import {TranslateService} from '@ngx-translate/core';
import {NzModalService} from 'ng-zorro-antd';
import {ElectronService} from '../../providers/electron.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {

  isNewPath = 'isNew';
  showModal = false;


  constructor(private router: Router,
              private translate: TranslateService,
              private modalService: NzModalService,
              private electron: ElectronService,
              ) {
  }


  routeTo(url: string) {
    this.router.navigateByUrl(url);
  }

  ngOnInit() {
    this.videoStartIfNew();
  }


  isNew() {
    return isNil(localStorage.getItem(this.isNewPath));
  }

  setNotNew() {
    localStorage.setItem(this.isNewPath, 'true');
  }

  videoStartIfNew() {
    if (this.isNew()) {
      this.showIntroModal();
    }
  }

  showIntroModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  showVideo() {
    this.closeModal();
    const me = this;
    const url = this.electron.remote.getCurrentWindow().webContents.getURL();
    new Promise((resolve, reject) => {
      try {
        const win = new me.electron.remote.BrowserWindow({
          width: 1280,
          height: 750,
          frame: true,
          resizable: false,
          opacity: 1,
          transparent: true,
          maximizable: false,
          minimizable: true,
          fullscreenable: false,
          alwaysOnTop: true,
          autoHideMenuBar: true,
        });
        win.once('close', () => {
          win.destroy();
          resolve();
        });
        win.show();
        console.log(url+'video');
        win.loadURL(url+'video');
      } catch {
        resolve();
      }
    }).then(() => me.onVideoExit());
  }

  onVideoExit() {
    this.closeModal();
    this.setNotNew();
  }
}
