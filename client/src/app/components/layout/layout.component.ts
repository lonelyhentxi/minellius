import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  menuItems = [
    {
      name: 'FUNCTION.BRIEF.NAME',
      icon: 'home',
      selected: true,
    },
    {
      name: 'FUNCTION.PERIOD.NAME',
      icon: 'line-chart',
      selected: false,
    },
    {
      name: 'FUNCTION.CURRENT.NAME',
      icon: 'bar-chart',
      selected: false,
    },
    {
      name: 'FUNCTION.CONTROL.NAME',
      icon: 'sync',
      selected: false,
    },
    {
      name: 'FUNCTION.HELPER.NAME',
      icon: 'customer-service',
      selected: false,
    }
  ];

  currentMenuItemIndex = 0;

  constructor() {
  }

  ngOnInit() {
  }

  menuSwitchTo(i: number) {
    this.menuItems.forEach(item => item.selected = false);
    this.menuItems[i].selected = true;
    this.currentMenuItemIndex = i;
  }
}
