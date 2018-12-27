import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {UserService} from '../../../providers/user.service';
import {TranslateService} from '@ngx-translate/core';
import {errorPrompt} from '../../../functools/error-prompt.functool';
import {HttpErrorResponse} from '@angular/common/http';
import {SignInDto} from '../../../dtos/sign-in.dto';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  constructor(
    private formBuilder: FormBuilder,
    private readonly messageService: NzMessageService,
    private readonly router: Router,
    private readonly userService: UserService,
    private readonly translator: TranslateService,
  ) {
  }

  validateForm: FormGroup;

  submitSpecErrorPrompt(error: HttpErrorResponse): string {
    if (error.status === 404) {
      return this.translator.instant('ERROR.LOGIN.NOTFOUND');
    } else if (error.status === 400) {
      return this.translator.instant('ERROR.LOGIN.INVALID');
    } else {
      return errorPrompt(this.translator, error);
    }
  }

  submitForm(): void {
    for (const control of Object.values(this.validateForm.controls)) {
      control.markAsDirty();
      control.updateValueAndValidity();
    }
    const me = this;
    const form = this.validateForm.getRawValue() as SignInDto;
    const subscription = this.userService.logIn({
        email: '' + form.email,
        password: '' + form.password,
      },
      (<{ remember: boolean }>this.validateForm.getRawValue()).remember)
      .subscribe(() => {
        me.messageService.success(
          [me.translator.instant('COMMON.LOGIN'), me.translator.instant('COMMON.SUCCESS')]
            .join(me.translator.instant('COMMON.WORDSEP')));
        subscription.unsubscribe();
        me.router.navigateByUrl('/layout');
      }, (err) => {
        me.messageService.warning(me.submitSpecErrorPrompt(err));
        subscription.unsubscribe();
      });
  }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.maxLength(254)]],
      password: [null, [Validators.required, Validators.maxLength(128)]],
      remember: [false]
    });
  }

  loginWithGithubSpecErrorPrompt(error): string {
    if (error.status === 404) {
      return ['COMMON.NOT','COMMON.USER', 'COMMON.BOUND']
        .map((val) => this.translator.instant(val))
        .join(this.translator.instant('COMMON.WORDSEP'));
    } else {
      return errorPrompt(this.translator, error);
    }
  }

  loginWithGithub(event): void {
    const me = this;
    (async () => {
      try {
        const code = await me.userService.waitGithubAuth();
        if (code) {
          console.log(code);
          await me.userService.loginGithub({code}).toPromise();
          me.messageService.success(['COMMON.LOGIN', 'COMMON.SUCCESS']
            .map((val) => me.translator.instant(val))
            .join(me.translator.instant('COMMON.WORDSEP')));
          me.router.navigateByUrl('/layout');
        } else {
          console.log(code);
          me.messageService.warning(['COMMON.NOT', 'COMMON.LOGIN']
            .map(word => me.translator.instant(word)).join(me.translator.instant('COMMON.WORDSEP')));
        }
      } catch (e) {
        console.log(e);
        me.messageService.warning(me.loginWithGithubSpecErrorPrompt(e));
      }
    })().then(() => {
    });
  }
}
