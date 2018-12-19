import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  validateForm: FormGroup;

  submitForm(): void {
    for (const control of Object.values(this.validateForm.controls)) {
      control.markAsDirty();
      control.updateValueAndValidity();
    }

    if (this.validateForm.getRawValue().email === 'lonely_hentai@hotmail.com') {
      this.message.create('error', `已注册的邮箱地址`);
    } else {
      this.message.create('success', `注册成功，请登录`);
      this.router.navigateByUrl('/log/log-in');
    }
  }

  constructor(private readonly formBuilder: FormBuilder,
              private readonly message: NzMessageService,
              private readonly router: Router,
  ) {
  }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      username: [null, [Validators.required]],
      password: [null, [Validators.required]]
    });
  }

}
