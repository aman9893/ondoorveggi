import { Component, computed, inject, OnInit, ViewChild } from '@angular/core';
import { register } from 'swiper/element/bundle';
import { AuthService } from '../../auth/auth.service';
import { DataService } from '../../auth/service/data.service';
import { Router } from '@angular/router';


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
  categoryDataList: any;
  mobileview: boolean= false;
  banners:any
 constructor(public dataService: DataService,public authService: AuthService, private router:Router){}
  ngOnInit(): void {
    this.mobileview = this.dataService.getIsMobileResolution();
    this.banners =this.dataService.getBanners();

   this.getCategaryapiCall();
  }
  logout() {
    this.authService.logout();
  }

  getCategaryapiCall(): void {
    this.dataService.usercategoryList('').subscribe((data) => this.categoryData(data),
      (err: Error) => this.errorcall(err));
  }
  errorcall(err: any): void {
    this.dataService.openSnackBar(err,'dismiss')
  }

    categoryData(data: any) {
      if(data.status == 1){
      this.categoryDataList = data.payload;
      console.log(   this.categoryDataList)
      }
    }

    goToProductLIst(id: any) {
      this.router.navigate(['/productlist', id]);
    }

  }
 
