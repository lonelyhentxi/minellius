import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {tap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit,OnDestroy {

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
  menuSwitcher$: Observable;

  constructor(private readonly route: ActivatedRoute) {
  }

  ngOnInit() {
    this.updateMenuItemIndexFromRouter();
  }

  ngOnDestroy(): void {
    this.men
  }

  menuSwitchTo(path: string) {
    const i = this.menuItems.findIndex(item => item.path === path);
    if (i === -1) {
      return;
    }
    this.menuItems.forEach(item => item.selected = false);
    this.menuItems[i].selected = true;
    this.currentMenuItemIndex = i;
  }

  updateMenuItemIndexFromRouter() {
    const me = this;
    const menuSwitcher = this.route.children[0].url.subscribe(lst => me.menuSwitchTo(lst.toString()));
    this.menuSwitcher$ = menuSwitcher;
    return menuSwitcher;
  }
}
