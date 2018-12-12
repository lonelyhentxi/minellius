import {Subscription} from 'rxjs';
import {OnDestroy, OnInit} from '@angular/core';

export interface MenuComponentInterface extends OnInit, OnDestroy {
  currentMenuItemIndex: number;
  menuItem$: Subscription;
  menuItems: { path: string, selected: boolean }[];
}
