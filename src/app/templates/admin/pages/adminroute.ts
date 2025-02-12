import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { LayoutComponent } from './dashbord/layout/layout.component';
import { AddBillCounetrComponent } from './bill-counter/add-bill-counetr/add-bill-counetr.component';
import { BillCounterComponent } from './bill-counter/bill-counter.component';
import { CategiresComponent } from './categires/categires.component';
import { ListContactBookComponent } from './contact-book/list-contact-book/list-contact-book.component';
import { DashbordComponent } from './dashbord/dashbord.component';
import { ListKhataComponent } from './khatabook/list-khata/list-khata.component';
import { MenulistComponent } from './menulist/menulist.component';
import { ProfileComponent } from './profile/profile.component';
import { TaxComponent } from './tax/tax.component';
import { LoginComponent } from './login/login.component';
import { UserorderlistAdminviewComponent } from '../userorderlist-adminview/userorderlist-adminview.component';
import { AdminAuthGuard } from '../../auth/admin.gurad';

const routes: Routes = [
  {path: '',component: LayoutComponent,
    children: [
  { path: '', redirectTo: 'main-page',  pathMatch:'full', canActivate: [AdminAuthGuard]},
  { path: 'adminhome', component: DashbordComponent,  canActivate: [AdminAuthGuard]},
  { path: 'contact', component: ListContactBookComponent,  canActivate: [AdminAuthGuard]},
  { path: 'Khatabook', component: ListKhataComponent   , canActivate: [AdminAuthGuard]},
  { path: 'product-list', component: MenulistComponent,  canActivate: [AdminAuthGuard]},
  { path: 'category', component: CategiresComponent, canActivate: [AdminAuthGuard] },
  { path: 'profile', component: ProfileComponent,  canActivate: [AdminAuthGuard]},
  { path: 'tax', component: TaxComponent,  canActivate: [AdminAuthGuard]},
  { path: 'bill', component: BillCounterComponent,  canActivate: [AdminAuthGuard]},
  { path: 'counterbill', component: AddBillCounetrComponent,  canActivate: [AdminAuthGuard]},
  { path: 'orderlistapp', component: UserorderlistAdminviewComponent, canActivate: [AdminAuthGuard] },
    ]
  },
  { path: 'adminlogin', component: LoginComponent},

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppAdminRoutingModule {}
