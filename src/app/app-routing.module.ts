import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './templates/auth/auth.guard';
import { CategiresComponent } from './templates/admin/pages/categires/categires.component';
import { SignInComponent } from './templates/course-rive/views/on-boarding/sign-in/sign-in.component';
import { MenulistComponent } from './templates/admin/pages/menulist/menulist.component';
import { AddContactBookComponent } from './templates/admin/pages/contact-book/add-contact-book/add-contact-book.component';
import { ListContactBookComponent } from './templates/admin/pages/contact-book/list-contact-book/list-contact-book.component';
import { ListKhataComponent } from './templates/admin/pages/khatabook/list-khata/list-khata.component';
import { DashbordComponent } from './templates/admin/pages/dashbord/dashbord.component';
import { LayoutComponent } from './templates/admin/pages/dashbord/layout/layout.component';
import { HelprequestComponent } from './templates/admin/pages/unprotected-component/helprequest/helprequest.component';
import { ProfileComponent } from './templates/admin/pages/profile/profile.component';
import { TaxComponent } from './templates/admin/pages/tax/tax.component';
import { BillCounterComponent } from './templates/admin/pages/bill-counter/bill-counter.component';
import { AddBillCounetrComponent } from './templates/admin/pages/bill-counter/add-bill-counetr/add-bill-counetr.component';
import { AppAdminRoutingModule } from './templates/admin/pages/adminroute';


const routes: Routes = [
  {
    path: '/home', 
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
