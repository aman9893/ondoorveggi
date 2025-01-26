import { Component, OnInit, ViewChild } from '@angular/core';
import { register } from 'swiper/element/bundle';
register();
@Component({
  selector: 'app-dashbord-user',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss'],
  standalone: false
  
})
export class DashbordComponentUser implements OnInit{
  menulist: any;

  ngOnInit(): void {
      this.menulistData();
      
  }

  menulistData(){
    this.menulist = [
      {
        title: 'Home',
        icon: 'home',
        link: '/',
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
        link: '/help',
        color: '##000'
      },
    ]  
  }
  }
 
