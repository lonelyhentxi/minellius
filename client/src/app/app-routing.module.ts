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
import {PeriodDetailComponent} from './components/period/period-detail/period-detail.component';
import {CurrentDetailComponent} from './components/current/current-detail/current-detail.component';
import {CurrentAreaComponent} from './components/current/current-area/current-area.component';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'log',
    component: LogComponent,
    children: [
      {
        path: 'log-in',
        component: LogInComponent,
      },
      {
        path: 'sign-up',
        component: SignUpComponent
      }
    ]
  },
  {
    path: 'layout',
    component: LayoutComponent,
    children: [
      {
        path: '',
        redirectTo: 'brief',
        pathMatch: 'full'
      },
      {
        path: 'brief',
        component: BriefComponent
      },
      {
        path: 'period',
        component: PeriodComponent,
        children: [
          {
            path: '',
            redirectTo: 'repo',
            pathMatch: 'full'
          },
          {
            path: 'user',
            component: PeriodDetailComponent,
          },
          {
            path: 'repo',
            component: PeriodDetailComponent,
          },
          {
            path: 'lang',
            component: PeriodDetailComponent,
          }
        ]
      },
      {
        path: 'current',
        component: CurrentComponent,
        children: [
          {
            path: '',
            redirectTo: 'repo',
            pathMatch: 'full'
          },
          {
            path: 'user',
            component: CurrentDetailComponent,
          },
          {
            path: 'repo',
            component: CurrentDetailComponent,
          },
          {
            path: 'lang',
            component: CurrentDetailComponent,
          },
          {
            path: 'org',
            component: CurrentDetailComponent,
          },
          {
            path: 'area',
            component: CurrentAreaComponent,
          },
        ]
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
  imports: [RouterModule.forRoot(routes, {
    useHash: true,
  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
