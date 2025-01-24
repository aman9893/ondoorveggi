import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from 'src/app/templates/auth/auth.service';
import { DataService } from 'src/app/templates/auth/service/data.service';
export interface MenuItem {
  title?: string;
  icon?: string;
  link?: string;
  color?: string;
  hideFor?: string;
  expanded?: boolean;
  subMenu?: MenuItem[];
}

export type Menu = MenuItem[];

@Component({
  selector: 'app-layout-user',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: false,
})
export class LayoutComponentUser implements OnInit {
  @ViewChild('drawer') drawer!: MatSidenav ;
  UserId: any;
  userData: any;
  opened = false;
  shopType: any | null;
  menulist:any=[]
  mobileview: boolean =false;
  showFiller = false;
    constructor(private router: Router,private cdref: ChangeDetectorRef,public dataService: DataService,public authService: AuthService, ) {
    this.mobileview =this.dataService.getIsMobileResolution();

    router.events.subscribe((val:any) => {
      if (val instanceof NavigationEnd) {
        console.log(val.url)
        if(this.mobileview || val.url==='/addcounterbill' || val.url==='/addcustombill'){
          this.drawer.close()
          this.cdref.detectChanges();
        }
      }
    });
  }

  ngOnInit(): void {
    this.UserId = this.authService.getUserId();
    // this.getResgiterDataById();
    this.shopType= localStorage.getItem('shop_type')
      this.menulist = [
        {
          title: 'Home',
          icon: 'home',
          link: '/user',
          color: '##000'
        },
        {
          title: 'Profile',
          icon: 'account_circle',
          link: '/userprofile',
          color: '##000'
        },
      
        {
          title: 'Orders',
          icon: 'store_mall_directory',
          link: '/Orders',
          color: '##000'
        },
        {
          title: 'Cart',
          icon: 'add_shopping_cart',
          link: '/cart',
          color: '##000'
        },
        {
          title: 'Addresses',
          icon: 'location_on',
          link: '/Addresses',
          color: '##000'
        },
      
        {
          title: 'Customer Support',
          icon: 'headset_mic',
          link: '/Orders',
          color: '##000'
        },
      ]  
  }

 

  getResgiterDataById() {
    this.dataService.getAdminProfileDataById(this.UserId)
      .subscribe(
        data => this.getRegisterData(data),
      )
  }

  getRegisterData(data: any) {
    this.userData = data[0];
    this.dataService.userData = this.userData;
    this.cdref.detectChanges();

  }
  logout() {
    this.authService.logout();
  }

  toggle(): void {
    this.opened = !this.opened;
    this.cdref.detectChanges();
  }


}
