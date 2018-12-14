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
import {CurrentUserLocationComponent} from './components/current/current-user-location/current-user-location.component';
import {CurrentRepoCreateatComponent} from './components/current/current-repo-createat/current-repo-createat.component';
import {CurrentRepoLangComponent} from './components/current/current-repo-lang/current-repo-lang.component';
import {CurrentRepoStarComponent} from './components/current/current-repo-star/current-repo-star.component';
import {CurrentRepoForkComponent} from './components/current/current-repo-fork/current-repo-fork.component';
import {CurrentRepoSizeComponent} from './components/current/current-repo-size/current-repo-size.component';
import {CurrentRepoLastPushComponent} from './components/current/current-repo-last-push/current-repo-last-push.component';
import {CurrentRepoLicenseComponent} from './components/current/current-repo-license/current-repo-license.component';
import {CurrentIssueCommentComponent} from './components/current/current-issue-comment/current-issue-comment.component';
import {CurrentUserLangComponent} from './components/current/current-user-lang/current-user-lang.component';
import {CurrentUserRepoComponent} from './components/current/current-user-repo/current-user-repo.component';
import {CurrentUserFollowerComponent} from './components/current/current-user-follower/current-user-follower.component';

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
            path: 'org',
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
            redirectTo: 'repo/lang',
            pathMatch: 'full'
          },
          {
            path: 'repo/createat',
            component: CurrentRepoCreateatComponent,
          },
          {
            path: 'repo/lang',
            component: CurrentRepoLangComponent,
          },
          {
            path: 'repo/star',
            component: CurrentRepoStarComponent,
          },
          {
            path: 'repo/fork',
            component: CurrentRepoForkComponent,
          },
          {
            path: 'repo/size',
            component: CurrentRepoSizeComponent,
          },
          {
            path: 'repo/pushat',
            component: CurrentRepoLastPushComponent,
          },
          {
            path: 'repo/license',
            component: CurrentRepoLicenseComponent,
          },
          {
            path: 'issue/comment',
            component: CurrentIssueCommentComponent,
          },
          {
            path: 'user/lang',
            component: CurrentUserLangComponent,
          },
          {
            path: 'user/location',
            component: CurrentUserLocationComponent,
          },
          {
            path: 'user/repo',
            component: CurrentUserRepoComponent,
          },
          {
            path: 'user/follower',
            component: CurrentUserFollowerComponent,
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
