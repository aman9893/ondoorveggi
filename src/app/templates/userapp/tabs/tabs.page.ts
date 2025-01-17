import { Component } from '@angular/core';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-tabs',
  templateUrl: 'tabs.page.html',
  styleUrls: ['tabs.page.scss'],
  standalone:false
})
export class TabsPage {

  constructor(
    public cart : CartService
  ) {}

}
