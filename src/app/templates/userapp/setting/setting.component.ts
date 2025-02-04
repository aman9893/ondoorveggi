import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss'],
  standalone:false
})
export class SettingComponent  implements OnInit {
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
  constructor() { }

  ngOnInit() {}

}
