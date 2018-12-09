import {HomeComponent} from './components/home/home.component';
import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LogComponent} from './components/log/log.component';
import {LayoutComponent} from './components/layout/layout.component';
import {LogInComponent} from './components/log/log-in/log-in.component';
import {SignUpComponent} from './components/log/sign-up/sign-up.component';
import {BriefComponent} from './components/brief/brief.component';
import {PeriodComponent} from './components/period/period.component';
import {CurrentComponent} from './components/current/current.component';
import {ControlComponent} from './components/control/control.component';
import {HelperComponent} from './components/helper/helper.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'log',
    component: LogComponent,
    children:[
      {
        path:'log-in',
        component: LogInComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent
      }
    ]
  },
  {
    path: 'layout/:function',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo:'brief',
        pathMatch: 'full'
      },
      {
        path: 'brief',
        component: BriefComponent
      },
      {
        path: 'period',
        component: PeriodComponent
      },
      {
        path: 'current',
        component: CurrentComponent
      },
      {
        path: 'control',
        component: ControlComponent
      },
      {
        path: 'helper',
        component: HelperComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {useHash: true})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
