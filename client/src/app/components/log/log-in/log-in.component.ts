import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {UserService} from '../../../providers/user.service';
import {TranslateService} from '@ngx-translate/core';
import {errorPrompt} from '../../../functools/error-prompt.functool';
import {HttpErrorResponse} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';
import {first} from 'rxjs/operators';

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

  submitSpecErrorPrompt(error: HttpErrorResponse): [boolean, string] {
    if (error.status === 404) {
      return [true, this.translator.instant('ERROR.LOGIN.NOTFOUND')];
    } else if(error.status===500) {
      return [true, this.translator.instant('ERROR.LOGIN.INVALID')];
    } else {
      return [false, ''];
    }
  }

  submitForm(): void {
    for (const control of Object.values(this.validateForm.controls)) {
      control.markAsDirty();
      control.updateValueAndValidity();
    }
    const me = this;
    this.userService.logIn(this.validateForm.getRawValue(),
      (<{ remember: boolean }>this.validateForm.getRawValue()).remember)
      .subscribe(() => {
      me.messageService.success(
        [me.translator.instant('COMMON.LOGIN'), me.translator.instant('COMMON.SUCCESS')]
          .join(me.translator.instant('COMMON.WORDSEP')));
      me.router.navigateByUrl('/layout');
    }, (err) => {
      const [isSpec,prompt] = me.submitSpecErrorPrompt(err);
      if (isSpec) {
        me.messageService.warning(prompt);
      } else {
        me.messageService.warning(errorPrompt(me.translator, err));
      }
    });
  }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      email: ['lonely_hentai@hotmail.com', [Validators.required, Validators.maxLength(150)]],
      password: ['lonelyhentai', [Validators.required, Validators.maxLength(128)]],
      remember: [false]
    });
  }
}
