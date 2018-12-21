import {Component, OnInit} from '@angular/core';
import {UserService} from '../../providers/user.service';
import {UserDto} from '../../dtos/user.dto';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import * as dayjs from 'dayjs';
import {OauthTokensAccesstoken} from '../../dtos/oauth-access-token.dto';
import {TranslateService} from '@ngx-translate/core';
import {ElectronService} from '../../providers/electron.service';
import {RedirectUriDto} from '../../dtos/redirect-uri.dto';
import * as urlParse from 'url-parse';
import {NzMessageService} from 'ng-zorro-antd';
import {errorPrompt} from '../../functools/error-prompt.functool';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  user: UserDto;
  github: OauthTokensAccesstoken;
  validateForm: FormGroup;
  currentEditIndex: number;
  uri: string;
  bind: boolean;

  constructor(
    private readonly userService: UserService,
    private fb: FormBuilder,
    private readonly translator: TranslateService,
    private readonly electron: ElectronService,
    private readonly messageService: NzMessageService,
  ) {
    this.user = this.userService.user;
    this.currentEditIndex = 0;
    this.refreshGithub();
    this.bind = false;
  }

  githubText() {
    if (this.github) {
      return this.translator.instant('COMMON.BOUND') + ' ' + this.userService.github.providerClientId;
    } else {
      return ['COMMON.NOT', 'COMMON.BOUND'].map((word) => this.translator.instant(word))
        .join(this.translator.instant('COMMON.WORDSEP'));
    }
  }

  ngOnInit() {
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required, Validators.maxLength(254)]],
      password: [null, [Validators.required, Validators.maxLength(128)]],
      checkPassword: [null, [Validators.required, this.confirmationValidator, Validators.maxLength(128)]],
      username: [null, [Validators.required, Validators.maxLength(150)]],
      captcha: [null, [Validators.required, Validators.maxLength(6), Validators.minLength(6)]]
    });
  }

  dayjs(time) {
    return dayjs(time);
  }

  get groupNames() {
    return this.user.groups.map((group) => group.name).join(' | ');
  }

  submitForm(): void {
    for (const control of Object.values(this.validateForm.controls)) {
      control.markAsDirty();
      control.updateValueAndValidity();
    }
  }

  updateConfirmValidator(): void {
    /** wait for refresh value */
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.validateForm.controls.password.value) {
      return {confirm: true, error: true};
    }
  };

  getCaptcha(e: MouseEvent): void {
    e.preventDefault();
  }

  triggerCurrent(currentIndex: number) {
    if (this.currentEditIndex === currentIndex) {
      this.currentEditIndex = 0;
    } else {
      this.currentEditIndex = currentIndex;
    }
  }

  githubBindStart() {
    const me = this;
    const subscription = this.userService.getGithubUri().subscribe((uri) => {
      this.triggerCurrent(2);
      me.githubBindWaitAuth(uri);
      subscription.unsubscribe();
    }, () => subscription.unsubscribe());
  }

  githubBindWaitAuth(uri: RedirectUriDto) {
    const me = this;
    const win = new this.electron.remote.BrowserWindow({
      height: 810,
      useContentSize: false,
      resizable: false,
      opacity: 1,
      frame: true,
      transparent: false,
      maximizable: false,
      minimizable: false,
      fullscreenable: false,
      alwaysOnTop: true,
      autoHideMenuBar: false,
    });
    const filters = {
      urls: ['*://minellius.evernightfireworks.com']
    };
    win.webContents.session.webRequest.onBeforeRedirect(filters, details => {
      me.uri = details.redirectURL;
      me.bind = true;
      win.close();
    });
    win.once('close', () => {
      win.destroy();
      if (me.bind) {
        me.bindGithub(this.uri);
      }
    });
    win.loadURL(uri.redirect_uri);
    win.show();
    win.center();
    win.focus();
  }

  refreshGithub() {
    const me = this;
    const subscription = this.userService.getOauthAccounts().subscribe(() => {
      me.github = me.userService.github;
      subscription.unsubscribe();
    }, err => {
      me.messageService.warning(errorPrompt(me.translator, err));
      subscription.unsubscribe();
    });
  }

  bindGithub(uri: string) {
    const url = urlParse(uri, true);
    const me = this;
    const subscription = this.userService.bindGithub({code: url.query['code']})
      .subscribe(() => {
        me.refreshGithub();
        me.messageService.success(['COMMON.BOUND', 'COMMON.SUCCESS']
          .map((val) => me.translator.instant(val))
          .join(me.translator.instant('COMMON.WORDSEP')));
        subscription.unsubscribe();
      }, (err) => {
        me.messageService.warning(errorPrompt(me.translator, err));
        subscription.unsubscribe();
      });
  }
}
