import { Component, OnInit, ViewChild } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { AuthService } from '../../auth/auth.service';
import { DataService } from '../../auth/service/data.service';
register();
@Component({
  selector: 'app-dashbord-user',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss'],
  standalone: false
  
})
export class DashbordComponentUser implements OnInit{
  menulist: any;
  public appPages = [
    {
      title: "Profile",
      url: "/userprofile",
      icon: "person-circle"
    },
    {
      title: "Orders",
      url: "/Orders",
      icon: "list-circle"
    },
    {
      title: "Cart",
      url: "/cart",
      icon: "cart"
    },
    {
      title: "Addresses",
      url: "/Addresses",
      icon: "location"
    },
    {
      title: "Customer Support",
      url: "/help",
      icon: "headset"
    },
  
  ];
  public selectedIndex = 0;
 constructor(public dataService: DataService,public authService: AuthService, ){}
  ngOnInit(): void {
      const path = window.location.pathname.split("folder/")[1];
      if (path !== undefined) {
        this.selectedIndex = this.appPages.findIndex(
          page => page.title.toLowerCase() === path.toLowerCase()
        );
      }
  }
  logout() {
    this.authService.logout();
  }

  }
 
