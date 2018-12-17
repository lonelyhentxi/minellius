import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {NzMessageService} from 'ng-zorro-antd';
import {Router} from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.scss']
})
export class LogInComponent implements OnInit {

  validateForm: FormGroup;

  submitForm(): void {
    for (const control of Object.values(this.validateForm.controls)) {
      control.markAsDirty();
      control.updateValueAndValidity();
    }
    if(this.validateForm.getRawValue().email==='Cty98@outlook.com'&&this.validateForm.getRawValue().password==='abcdefg') {
      this.message.create('success','登录成功');
      this.router.navigateByUrl('layout');
    } else {
      this.message.create('warning','用户名或密码错误');
    }
  }

  constructor(
    private formBuilder: FormBuilder,
    private readonly message: NzMessageService,
    private readonly router: Router,
              ) {
  }

  ngOnInit(): void {
    this.validateForm = this.formBuilder.group({
      email: [null, [Validators.required]],
      password: [null, [Validators.required]],
      remember: [false]
    });
  }
}
