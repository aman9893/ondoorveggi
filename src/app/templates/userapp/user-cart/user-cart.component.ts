import { Component, OnInit } from '@angular/core';
import { DataService } from '../../auth/service/data.service';
import {Location} from '@angular/common';
import { ModalController } from '@ionic/angular';
@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss'],
  standalone:false
})
export class UserCartComponent  implements OnInit {


  cartvalue:any = [];


  constructor(public cart : DataService,private _location: Location,public modalController: ModalController) {}

  dismissModal() {
    this.modalController.dismiss();
  }
  ngOnInit() {
    // this.callproduct()
    this.CartDetails();
    this.cartNumberFunc();
  }
  backClicked() {
    this._location.back();
  }
  callproduct() {
    this.cart.productList.subscribe(value => {
      value.forEach((item: any) => {
        item.quantity = 1;
        this.cartvalue.push(item);
      });
    });
  }


  placeOrder() {
  }


  grandTotal:any ;
  calcGrandTotal() {
    this.grandTotal = 0
     this.cartvalue.forEach((item: any)=> {
      let total = item.quantity * item.price;
      this.grandTotal += total;
    });
    console.log(this.cartvalue);
   
  }

  incrementQty(item: any) {
    this.cartvalue.map((a: any, index: any) => {
      if (item.prod_id === a.prod_id) {
        item.quantity++;
       this.calcGrandTotal();
      }
    })
   
  }

  decrementQty(item:any) {
    item.quantity--;
    this.cartvalue.map((a: any, index: any) => {
      if (item.quantity ==0 &&item.prod_id === a.prod_id) {
        this.cartvalue.splice(index, 1);
      }
    })
    this.calcGrandTotal();
  }

  removeItem(id:any) {
    // this.cart = this.cart.filter(item => item.id !== id);
    this.calcGrandTotal();
  }



  getCartDetails: any = [];

  CartDetails() {
    if (localStorage.getItem('localCart')) {
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart')!);
    }
    this.loadCart();
  }

  incQnt(prod_id: any, qty: any) {
    for (let i = 0; i < this.getCartDetails.length; i++) {
      if (this.getCartDetails[i].prod_id == prod_id) {
        if (qty != 5) this.getCartDetails[i].qty = parseInt(qty) + 1;
      }
    }
    localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
    this.loadCart();
  }

  decQnt(prod_id: any, qty: any) {
    console.log(prod_id, qty);
    for (let i = 0; i < this.getCartDetails.length; i++) {
      if (this.getCartDetails[i].prod_id == prod_id) {
        if (qty != 1) this.getCartDetails[i].qty = parseInt(qty) - 1;
      }
      if(qty == 1){
        this.singleDelete(prod_id);
      }
    }
    localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
    this.loadCart();
  }

  total: number = 0;
  loadCart() {
    if (localStorage.getItem('localCart')) {
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart')!);
      console.log(this.getCartDetails)
      this.total = this.getCartDetails.reduce(function (acc: any, val: any) {
        return acc + val.price * val.qty;
      }, 0);
    }
  }

  removeall() {
    localStorage.removeItem('localCart');
    this.getCartDetails = [];
    this.total = 0;
    this.cartNumber = 0;
    this.cart.cartSubject.next(this.cartNumber);
  }

  singleDelete(getCartDetail: any) {
    console.log(getCartDetail);
    if (localStorage.getItem('localCart')) {
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart')!);
      for (let i = 0; i < this.getCartDetails.length; i++) {
        if (this.getCartDetails[i].prod_id === getCartDetail) {
          this.getCartDetails.splice(i, 1);
          localStorage.setItem(
            'localCart',
            JSON.stringify(this.getCartDetails)
          );
          this.loadCart();
          this.cartNumberFunc();
        }
      }
    }
  }

  cartNumber: number = 0;
  cartNumberFunc() {
    var cartValue = JSON.parse(localStorage.getItem('localCart')!);
    this.cartNumber = cartValue.length;
    this.cart.cartSubject.next(this.cartNumber);
  }

}
