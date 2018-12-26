import {Injectable} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {MenuComponentInterface} from '../interfaces/menu-component.interface';

@Injectable({
  providedIn: 'root'
})
export class MenuService {

  constructor() {
  }

  menuSwitchTo<T extends { path: string }>(menuItems: T[], path: string): number {
    const i = menuItems.findIndex(item => item.path === path);
    if (i === -1) {
      return 0;
    }
    return i;
  }

  subscribeMenuItemAutoUpdate(component: MenuComponentInterface, route: ActivatedRoute) {
    component.menuItem$ = route.firstChild.url.subscribe((urls) => {
      component.currentMenuItemIndex = this.menuSwitchTo(component.menuItems, urls.join('/'));
    });
  }

  unsubscribeMenuItemAutoUpdate(component: MenuComponentInterface) {
    component.menuItem$.unsubscribe();
  }
}
