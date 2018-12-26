import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-layout-logo',
  templateUrl: './layout-logo.component.html',
  styleUrls: ['./layout-logo.component.scss']
})
export class LayoutLogoComponent implements OnInit {

  constructor(private readonly router: Router) {
  }

  ngOnInit() {
  }

  toHome() {
    this.router.navigateByUrl('/');
  }
}
