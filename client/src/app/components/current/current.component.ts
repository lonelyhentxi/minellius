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

  menuItems:{name:string,path:string,icon:string }[] = [
    {
      name: 'REPO.CREATEAT',
      path: 'repo/createat',
      icon: 'github',
    },
    {
      name: 'REPO.LANG',
      path: 'repo/lang',
      icon: 'bold',
    },
    {
      name: 'REPO.STAR',
      path: 'repo/star',
      icon: 'star'
    },
    {
      name: 'REPO.FORK',
      path: 'repo/fork',
      icon: 'fork'
    },
    {
      name: 'REPO.SIZE',
      path: 'repo/size',
      icon: 'inbox'
    },
    {
      name: 'REPO.PUSHAT',
      path: 'repo/pushat',
      icon: 'upload'
    },
    {
      name: 'REPO.LICENSE',
      path: 'repo/license',
      icon: 'audit'
    },
    {
      name: 'ISSUE.COMMENT',
      path: 'issue/comment',
      icon: 'message'
    },
    {
      name: 'USER.LANG',
      path: 'user/lang',
      icon: 'underline'
    },
    {
      name: 'USER.LOCATION',
      path: 'user/location',
      icon: 'global'
    },
    {
      name: 'USER.REPO',
      path: 'user/repo',
      icon: 'profile'
    },
    {
      name: 'USER.FOLLOWER',
      path: 'user/follower',
      icon: 'contacts'
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
