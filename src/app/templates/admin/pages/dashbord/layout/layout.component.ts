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
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
  standalone: false,
})
export class LayoutComponent implements OnInit {
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
    this.getResgiterDataById();
    this.shopType= localStorage.getItem('shop_type')
    if(this.shopType === 'restaurant'){
      this.menulist = [
        {
          title: 'Home',
          icon: 'home',
          link: '/home',
          color: '##000'
        },
      
        {
          title: 'Counter Billing',
          icon: 'restaurant_menu',
          link: '/bill',
          color: '##000'
        },
        // {
        //   title: 'Custom Billing',
        //   icon: 'restaurant_menu',
        //   link: '/addcustombill',
        //   color: '##000'
        // },
        // {
        //   title: 'Table Billing',
        //   icon: 'table_chart',
        //   link: '/tablebill',
        //   color: '##000'
        // },
        // {
        //   title: 'Billing List',
        //   icon: 'receipt',
        //   link: '/counterbill',
        //   color: '##000'
        // },
        // {
        //   title: 'Table Billing List',
        //   icon: 'receipt',
        //   link: '/tablebillList',
        //   color: '##000'
        // },
        
        {
          title: 'Khatabook',
          icon: 'assignment',
          link: '/Khatabook',
          color: '##000'
        },
        {
          title: 'Contact Management',
          icon: 'person_add',
          link: '/contact',
          color: '##000'
        },
    
        {
          title: 'Category Management',
          icon: 'event_note',
          color: '##000',
          link: '/category'
        },
        {
          title: 'Product Management',
          icon: 'restaurant_menu',
          link: '/product',
          color: '##000'
        },
        
            {
              title: 'Add Tax',
              icon: 'store_mall_directory',
              color: '##000',
              link: '/tax'
            },
            // {
            //   title: 'Add Attender',
            //   icon: 'person_pin',
            //   color: '##000',
            //   link: '/attender'
            // },
            // {
            //   title: 'Add Printer',
            //   icon: 'picture_as_pdf',
            //   color: '##000',
            //   link: '/printer'
            // },
            {
              title: 'Help',
              icon: 'pan_tool',
              color: '##000',
              link: '/help'
            },
          ]
    
    }
    else{
      this.menulist = [
        
        {
          title: 'Home',
          icon: 'home',
          link: '/home',
          color: '##000'
        },
        {
          title: 'Billing',
          icon: 'restaurant_menu',
          link: '/bill',
          color: '##000'
        },
       
        {
          title: 'Khatabook',
          icon: 'assignment',
          link: '/Khatabook',
          color: '##000'
        },
        {
          title: 'Contact Management',
          icon: 'person_add',
          link: '/contact',
          color: '##000'
        },
    
            {
              title: 'Category Management',
              icon: 'event_note',
              color: '##000',
              link: '/category'
            },
            {
              title: 'Add Tax',
              icon: 'store_mall_directory',
              color: '##000',
              link: '/tax'
            },
            {
              title: 'Product Management',
              icon: 'restaurant_menu',
              link: '/product',
              color: '##000'
            },
            
            {
              title: 'Help',
              icon: 'pan_tool',
              color: '##000',
              link: '/help'
            },
    
      ];
    }
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
