import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { DashbordComponentUser } from './templates/userapp/dashbord/dashbord.component';
import { AddressComponent } from './templates/userapp/address/address.component';
import { UserprofileComponent } from './templates/userapp/userprofile/userprofile.component';
import { HelpSuppportComponent } from './templates/userapp/pages/help-suppport/help-suppport.component';
import { UserLoginComponent } from './templates/userapp/user-login/user-login.component';
import { UserCartComponent } from './templates/userapp/user-cart/user-cart.component';
import { UserorderlistComponent } from './templates/userapp/userorderlist/userorderlist.component';

const routes: Routes = [
  // {path: '',component: LayoutComponentUser,
  //   children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        { path: 'home', component: DashbordComponentUser, },
        { path: 'cart', component: UserCartComponent, },
        { path: 'Orders', component: UserorderlistComponent, },
        { path: 'Addresses', component: AddressComponent, },
        { path: 'userprofile', component: UserprofileComponent, },
        { path: 'help', component: HelpSuppportComponent, },
        { path: 'login', component: UserLoginComponent, },

        
  // },

];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
