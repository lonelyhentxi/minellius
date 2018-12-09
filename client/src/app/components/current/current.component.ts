import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-current',
  templateUrl: './current.component.html',
  styleUrls: ['./current.component.scss']
})
export class CurrentComponent implements OnInit {

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

  constructor() {
  }

  ngOnInit() {
  }

}
