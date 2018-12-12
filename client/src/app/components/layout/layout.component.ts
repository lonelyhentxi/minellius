import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {MenuService} from '../../providers/menu.service';
import {MenuComponentInterface} from '../../interfaces/menu-component.interface';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy, MenuComponentInterface {

  menuItems: { name: string, icon: string, path: string, selected: boolean }[] = [
    {
      name: 'FUNCTION.BRIEF.NAME',
      icon: 'home',
      path: 'brief',
      selected: false,
    },
    {
      name: 'FUNCTION.PERIOD.NAME',
      icon: 'line-chart',
      path: 'period',
      selected: false,
    },
    {
      name: 'FUNCTION.CURRENT.NAME',
      icon: 'bar-chart',
      path: 'current',
      selected: false,
    },
    {
      name: 'FUNCTION.CONTROL.NAME',
      path: 'control',
      icon: 'sync',
      selected: false,
    },
    {
      name: 'FUNCTION.HELPER.NAME',
      icon: 'customer-service',
      path: 'helper',
      selected: false,
    }
  ];

  currentMenuItemIndex: number;
  menuItem$: Subscription;

  constructor(private readonly route: ActivatedRoute, private readonly menuService: MenuService) {

  }

  ngOnInit() {
    this.menuService.subscribeMenuItemAutoUpdate(this,this.route);
  }

  ngOnDestroy(): void {
    this.menuService.unsubscribeMenuItemAutoUpdate(this);
  }
}
