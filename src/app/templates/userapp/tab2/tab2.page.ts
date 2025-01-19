import { Component, HostListener, OnInit } from '@angular/core';
import { CartService } from '../services/cart/cart.service';

@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone:false
})
export class Tab2Page implements OnInit   {
  header!: HTMLElement;
  sticky!: number;
  constructor(
    public cart : CartService,
  ) {

  }
  ngOnInit() {
    this.header = document.getElementById("myHeader") as HTMLElement;
    this.sticky = this.header.offsetTop;
  }
  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.myFunction();
  }

  myFunction() {
    if (window.pageYOffset > this.sticky) {
      this.header.classList.add("sticky");
    } else {
      this.header.classList.remove("sticky");
    }
  }
  ionViewWillEnter() {
    this.cart.unseen = 0;
    this.cart.getCartTotalQty();
    this.cart.totalPrice();
  }

  placeOrder() {
    
  }

}
