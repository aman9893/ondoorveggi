import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { SignInComponent } from './templates/course-rive/views/on-boarding/sign-in/sign-in.component';
import { AuthGuard } from './templates/auth/auth.guard';
import { MenulistComponent } from './templates/admin/menulist/menulist.component';

const routes: Routes = [
  // {
  //   path: '',
  //   loadChildren: () =>
  //     import('./drawer/drawer.module').then((m) => m.DrawerPageModule),
  // },
  { path: 'login', component: SignInComponent, },
  { path: 'product', component: MenulistComponent, },
  {
    path: '', canActivate: [AuthGuard],
    loadChildren: () =>
      import('./templates/course-rive/course-rive.module').then(
        (m) => m.CourseRivePageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
