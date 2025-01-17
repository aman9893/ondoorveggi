import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './templates/auth/auth.guard';
import { CategiresComponent } from './templates/admin/pages/categires/categires.component';
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
import { LayoutComponentUser } from './templates/userapp/dashbord/layout/layout.component';
import { DashbordComponentUser } from './templates/userapp/dashbord/dashbord.component';
import { Tab2Page } from './templates/userapp/tab2/tab2.page';
import { Tab3Page } from './templates/userapp/tab3/tab3.page';
import { TabsPage } from './templates/userapp/tabs/tabs.page';
import { AddressComponent } from './templates/userapp/address/address.component';
import { UserprofileComponent } from './templates/userapp/userprofile/userprofile.component';

const routes: Routes = [
  {path: '',component: LayoutComponentUser,
    children: [
        { path: '', redirectTo: 'user', pathMatch: 'full' },
        { path: 'user', component: DashbordComponentUser, },
        { path: 'cart', component: Tab2Page, },
        { path: 'product', component: Tab3Page, },
        { path: 'Orders', component: TabsPage, },
        { path: 'Addresses', component: AddressComponent, },
        { path: 'userprofile', component: UserprofileComponent, },
        
    ]
  },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
