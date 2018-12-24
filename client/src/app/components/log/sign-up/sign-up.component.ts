import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';
import {Router} from '@angular/router';
import {UserService} from '../../../providers/user.service';
import {errorPrompt} from '../../../functools/error-prompt.functool';
import {TranslateService} from '@ngx-translate/core';
import {HttpErrorResponse} from '@angular/common/http';
import {debounceTime} from 'rxjs/operators';
import {SignUpDto} from '../../../dtos/sign-up.dto';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  validateForm: FormGroup;

  constructor(private readonly formBuilder: FormBuilder,
              private readonly message: NzMessageService,
              private readonly router: Router,
              private readonly userService: UserService,
              private readonly translator: TranslateService,
  ) {
  }

  submitSpecErrorPrompt(error: HttpErrorResponse): string {
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

  submitForm(): void {
    for (const control of Object.values(this.validateForm.controls)) {
      control.markAsDirty();
      control.updateValueAndValidity();
    }
    const me = this;
    const form = this.validateForm.getRawValue() as SignUpDto;
    const subscription = this.userService.signUp({
      email: '' + form.email,
      password: '' + form.password,
      username: '' + form.password
    }).pipe(debounceTime(300)).subscribe(() => {
      me.message.success(
        [me.translator.instant('COMMON.SIGNUP'), me.translator.instant('COMMON.SUCCESS')]
          .join(me.translator.instant('COMMON.WORDSEP')));
      subscription.unsubscribe();
      me.router.navigateByUrl('/log/log-in');
    }, err => {
      me.message.warning(me.submitSpecErrorPrompt(err));
      subscription.unsubscribe();
    });
  }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email, Validators.maxLength(254)]],
      username: [null, [Validators.required, Validators.maxLength(150)]],
      password: [null, [Validators.required, Validators.maxLength(128)]]
    });
  }

}
