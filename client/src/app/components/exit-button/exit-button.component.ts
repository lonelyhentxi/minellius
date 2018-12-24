import { Component, OnInit } from '@angular/core';
import {ElectronService} from '../../providers/electron.service';

@Component({
  selector: 'app-exit-button',
  templateUrl: './exit-button.component.html',
  styleUrls: ['./exit-button.component.scss']
})
export class ExitButtonComponent implements OnInit {

  showModal = false;

  constructor(
    private readonly electron: ElectronService
  ) { }

  ngOnInit() {
  }

  beforeExitApp() {
    this.showModal = true;
  }

  cancelExit() {
    this.showModal = false;
  }

  exit() {
    this.electron.remote.app.exit(0);
  }
}
