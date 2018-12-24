import {Component, OnInit} from '@angular/core';
import {UserService} from '../../providers/user.service';
import {UserDto} from '../../dtos/user.dto';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {TranslateService} from '@ngx-translate/core';
import {ElectronService} from '../../providers/electron.service';
import {isNotNil, NzMessageService} from 'ng-zorro-antd';
import {errorPrompt} from '../../functools/error-prompt.functool';
import {UnbindDto} from '../../dtos/unbind.dto';
import {InAccountDto} from '../../dtos/in-account.dto';
import {HttpErrorResponse} from '@angular/common/http';
import {equalPipe, pipeBuild} from '../../functools/option-pipe-builder.functool';
import {debounceTime} from 'rxjs/operators';
import {Observable, of, Subject, Subscription} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-control',
  templateUrl: './control.component.html',
  styleUrls: ['./control.component.scss']
})
export class ControlComponent implements OnInit {

  user: UserDto;
  validateForm: FormGroup;
  currentEditIndex: number;
  githubId: string;

  constructor(
    private readonly userService: UserService,
    private fb: FormBuilder,
    private readonly translator: TranslateService,
    private readonly electron: ElectronService,
    private readonly messageService: NzMessageService,
    private readonly router: Router,
  ) {
    this.user = this.userService.user;
    this.currentEditIndex = 0;
  }

  get githubText() {
    if (this.githubId) {
      return this.translator.instant('COMMON.BOUND') + ' ' + this.githubId;
    } else {
      return ['COMMON.NOT', 'COMMON.BOUND'].map((word) => this.translator.instant(word))
        .join(this.translator.instant('COMMON.WORDSEP'));
    }
  }

  get isBindGithub() {
    return isNotNil(this.githubId);
  }

  async ngOnInit() {
    await this.refreshGithub();
    this.validateForm = this.fb.group({
      email: [null, [Validators.email, Validators.required, Validators.maxLength(254)]],
      currentPassword: [null, [Validators.required, Validators.maxLength(128)]],
      password: [null, [Validators.required, Validators.maxLength(128)]],
      checkPassword: [null, [this.confirmationValidator]],
      username: [null, [Validators.required, Validators.maxLength(150)]],
    });
  }

  get groupNames() {
    return this.user.groups.map((group) => group.name).join(' | ');
  }

  submitSpecErrorPrompt(error: HttpErrorResponse): string {
    if (error.status === 401) {
      return this.translator.instant('ERROR.UPDATE.UNAUTH');
    }
    if (error.status === 409) {
      const emailExisted: boolean = error.message.toString().split(/\s+/g)
        .map(sub => sub.trim())
        .filter(sub => sub !== '' && sub.match(/["']/)).some(sub => 'email' === sub);
      return [this.translator.instant('ERROR.SIGNUP.CONFLICT'),
        this.translator.instant(emailExisted ? 'COMMON.EMAIL' : 'COMMON.USERNAME')]
        .join(this.translator.instant('COMMON.WORDSEP'));
    } else if (error.status === 400) {
      return this.translator.instant('ERROR.SIGNUP.FORMAT');
    } else {
      return errorPrompt(this.translator, error);
    }
  }

  submitForm() {
    for (const control of Object.values(this.validateForm.controls)) {
      control.markAsDirty();
      control.updateValueAndValidity();
    }
    const me = this;
    const accountUpdate = this.validateForm.getRawValue() as InAccountDto;
    this.userService.updateAccount(
      pipeBuild({
          currentPassword: '' + accountUpdate.currentPassword,
          password: '' + accountUpdate.password
        },
        equalPipe('email', me.user.email !== accountUpdate.email ? '' + accountUpdate.email : undefined),
        equalPipe('username', me.user.username !== accountUpdate.username ? '' + accountUpdate.username : undefined),
      )).toPromise()
      .then(() => {
        me.refreshUserInfo();
        me.messageService.success(['COMMON.CHANGE', 'COMMON.SUCCESS']
          .map(val => me.translator.instant(val))
          .join(me.translator.instant('COMMON.WORDSEP'))
        );
      })
      .catch((err) => {
        me.messageService.warning(
          me.submitSpecErrorPrompt(err)
        );
      });
  }

  refreshUserInfo() {
    this.user = this.userService.user;
  }

  updateConfirmValidator(): void {
    Promise.resolve().then(() => this.validateForm.controls.checkPassword.updateValueAndValidity());
  }

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return {required: true};
    } else if (control.value !== this.validateForm.controls.password.value) {
      return {confirm: true, error: true};
    }
  };

  triggerCurrent(currentIndex: number) {
    if (this.currentEditIndex === currentIndex) {
      this.currentEditIndex = 0;
    } else {
      this.currentEditIndex = currentIndex;
    }
  }

  toBindGithub() {
    const me = this;
    (async () => {
      try {
        const code = await me.userService.waitGithubAuth();
        if (code) {
          await me.userService.bindGithub({code}).toPromise();
          me.messageService.success(['COMMON.BOUND', 'COMMON.SUCCESS']
            .map((val) => me.translator.instant(val))
            .join(me.translator.instant('COMMON.WORDSEP')));
          await me.refreshGithub();
        } else {
          me.messageService.warning(['COMMON.NOT', 'COMMON.BOUND']
            .map(word => me.translator.instant(word)).join(me.translator.instant('COMMON.WORDSEP')));
        }
      } catch (e) {
        me.messageService.warning(errorPrompt(me.translator, e));
      }
    })().then(() => {
    });
  }

  unbind(unbind: UnbindDto) {
    const me = this;
    (async () => {
      try {
        await me.userService.unbind(unbind);
        me.messageService.success(['COMMON.CANCEL', 'COMMON.SUCCESS']
          .map((val) => me.translator.instant(val))
          .join(me.translator.instant('COMMON.WORDSEP')));
        await me.refreshGithub();
      } catch (e) {
        me.messageService.warning(errorPrompt(me.translator, e));
      }
    })().then(() => {
    });
  }

  refreshGithub() {
    const me = this;
    this.userService.getGithubAccount().toPromise().then((account) => {
      if (account) {
        this.githubId = account.providerClientId;
      } else {
        this.githubId = undefined;
      }
    }, (e) => me.messageService.warning(errorPrompt(this.translator, e)));
  }

  logout(event) {
    this.userService.logout();
    const me = this;
    this.messageService.success(['COMMON.LOGOUT', 'COMMON.SUCCESS']
      .map(val => me.translator.instant(val))
      .join(me.translator.instant('COMMON.WORDSEP'))
    );
    this.router.navigateByUrl('/');
  }
}
