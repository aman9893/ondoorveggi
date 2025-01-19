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
import { HelprequestComponent } from './unprotected-component/helprequest/helprequest.component';

const routes: Routes = [
  {path: '',component: LayoutComponent,
    children: [
        { path: '', redirectTo: 'main-page', pathMatch: 'full' },
  { path: 'home', component: DashbordComponent, },
  { path: 'contact', component: ListContactBookComponent, },
  { path: 'Khatabook', component: ListKhataComponent   },
  { path: 'product-list', component: MenulistComponent, },
  { path: 'category', component: CategiresComponent, },
  { path: 'help', component: HelprequestComponent, },
  { path: 'profile', component: ProfileComponent, },
  { path: 'tax', component: TaxComponent, },
  { path: 'bill', component: BillCounterComponent, },
  { path: 'counterbill', component: AddBillCounetrComponent, },
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppAdminRoutingModule {}
