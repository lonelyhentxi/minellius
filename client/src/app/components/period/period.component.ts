import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuService} from '../../providers/menu.service';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {MenuComponentInterface} from '../../interfaces/menu-component.interface';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss']
})
export class PeriodComponent implements OnInit, OnDestroy, MenuComponentInterface {

  menuItems: { name: string, path: string, icon: string, children?: any, selected: boolean }[] = [
    {
      name: 'REPO',
      path: 'repo',
      icon: 'database',
      selected: false,
    },
    {
      name: 'USER',
      path: 'user',
      icon: 'user',
      selected: false,
    },
    {
      name: 'LANG',
      path: 'lang',
      icon: 'code',
      selected: false,
    },
  ];

  menuItem$: Subscription;
  currentMenuItemIndex: number;

  constructor(private readonly route: ActivatedRoute, private readonly menuService: MenuService) {
  }

  ngOnInit() {
    this.menuService.subscribeMenuItemAutoUpdate(this,this.route);
  }

  ngOnDestroy(): void {
    this.menuService.unsubscribeMenuItemAutoUpdate(this);
  }
}
