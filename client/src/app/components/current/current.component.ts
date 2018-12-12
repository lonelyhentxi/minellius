import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {ActivatedRoute} from '@angular/router';
import {MenuService} from '../../providers/menu.service';
import {MenuComponentInterface} from '../../interfaces/menu-component.interface';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit, OnDestroy, MenuComponentInterface {

  menuItems:{name:string,path:string,icon:string,children?:any,selected:boolean}[] = [
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
    {
      name: 'ORG',
      path: 'org',
      icon: 'usergroup-add',
      selected: false,
    },
    {
      name: 'AREA',
      path: 'area',
      icon: 'global',
      selected: false,
    }
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
