import { Component, CUSTOM_ELEMENTS_SCHEMA, input, OnInit } from '@angular/core';
import { IonRow, IonicSlides } from '@ionic/angular/standalone';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.scss'],

standalone:false, 
})
export class BannerComponent  implements OnInit {

  swiperModules = [IonicSlides];
  bannerImages = input<any[]>([]);

  constructor() { }

  ngOnInit() {}

}