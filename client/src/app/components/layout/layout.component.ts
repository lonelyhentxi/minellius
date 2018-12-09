import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {MenuService} from '../../providers/menu.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit, OnDestroy {

  menuItems = [
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

  constructor(private readonly route: ActivatedRoute) {
  }

  ngOnDestroy(): void {

  }

  menuSwitchTo(i: number) {
    this.menuItems.forEach(item => item.selected = false);
    this.menuItems[i].selected = true;
    this.currentMenuItemIndex = i;
    this.getMenuItemIndexFromRouter();
    // this.router.navigateByUrl(`/layout/${this.menuItems[i].path}`);
  }

  getMenuItemIndexFromRouter() {
  }
}
