import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RiveModule, RIVE_FOLDER } from 'ng-rive';

import { CourseRivePage } from './course-rive.page';
import { AuthGuard } from '../auth/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: CourseRivePage, canActivate: [AuthGuard],
  },
  {
    path: 'home', canActivate: [AuthGuard],
    loadChildren: () =>
      import('./views/content-view/content-view.module').then(
        (m) => m.ContentViewPageModule
      ),
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes), RiveModule],
  exports: [RouterModule, RiveModule],
  providers: [
    {
      provide: RIVE_FOLDER,
      useValue: 'assets/course_rive/rive',
    },
  ],
})
export class CourseRivePageRoutingModule {}
