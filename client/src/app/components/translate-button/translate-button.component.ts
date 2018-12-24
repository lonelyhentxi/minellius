import {Component, OnInit} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';
import {NzMessageService} from 'ng-zorro-antd';
import {CustomTranslateService} from '../../providers/custom-translate.service';

@Component({
  selector: 'app-translate-button',
  templateUrl: './translate-button.component.html',
  styleUrls: ['./translate-button.component.scss']
})
export class TranslateButtonComponent implements OnInit {

  constructor(
    private readonly translator: CustomTranslateService,
    private readonly messageService: NzMessageService,
  ) {
  }

  ngOnInit() {
  }

  translate() {
    if(this.translator.loadLang()==='zh-cn') {
      this.translator.setLang('en');
      this.messageService.success('Change to english, please restart app');
    } else {
      this.translator.setLang('zh-cn');
      this.messageService.success('已切换到中文，请重启应用以生效');
    }
  }
}
