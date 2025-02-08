import { Component, OnInit } from '@angular/core';
import { DataService } from '../../auth/service/data.service';
import { Location } from '@angular/common';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { AddressComponent } from '../address/address.component';
import { WindowRefService } from '../../auth/service/window-ref.service';
import { PaymentpageComponent } from '../paymentpage/paymentpage.component';
@Component({
  selector: 'app-user-cart',
  templateUrl: './user-cart.component.html',
  styleUrls: ['./user-cart.component.scss'],
  standalone: false
})
export class UserCartComponent implements OnInit {
  cartvalue: any = [];
  UserId: any;
  useraddress: any = true;
  addressshowvalue: boolean = false;

  constructor(public cart: DataService, private _location: Location, public modalController: ModalController, public route: Router, public dataService: DataService, private router: Router,
    public authService: AuthService, private winRef: WindowRefService,) {
    this.UserId = this.authService.getUserId();
    this.getUserAddressValue();
  }

  dismissModal(cartpage:any) {
    if (this._location.path() == '/cart') {
      this.route.navigateByUrl('/home')
    }
    else {
      this.modalController.dismiss(cartpage);
    }
  }
  ngOnInit() {
    this.CartDetails();
  }

  grandSubTotal: any;
  grandtotal: any;
  calcGrandTotal() {
    this.grandSubTotal = 0
    this.grandtotal = 0
    this.getCartDetails.forEach((item: any) => {
      let total = item.qty * item.price;
      this.grandSubTotal += total;
    });
    this.grandtotal = this.grandSubTotal + 15;
    console.log(this.grandtotal);

  }

  removeItem(id: any) {
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
      if (qty == 1) {
        this.singleDelete(prod_id);
      }
    }
    localStorage.setItem('localCart', JSON.stringify(this.getCartDetails));
    this.loadCart();
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
        }
      }
    }
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
    this.calcGrandTotal();
    this.cartNumberFunc();

  }

  removeall() {
    localStorage.removeItem('localCart');
    this.getCartDetails = [];
    this.total = 0;
    this.cartNumber = 0;
    this.cart.cartSubject.next(this.cartNumber);
  }



  cartNumber: number = 0;
  cartNumberFunc() {
    var cartValue = JSON.parse(localStorage.getItem('localCart')!);
    this.cartNumber = cartValue?.length;
    this.cart.productCartValueUpdate.emit(this.cartNumber);
  }

  onSubmitForPay() {
    console.log(this.getCartDetails)
    let r = Math.random().toString(36).substring(7);
    let orderForm = {
      user_id: this.UserId,
      address_id: 0,
      invoic: r,
      discount_amt: 0,
      product_details: this.getCartDetails,
      total_amt: this.grandtotal,
      delivery_amt: 15,
      subtoal: this.grandSubTotal,
      order_status: 1,
      tax: 0,
      payment_type: 1,
    };
    console.log(orderForm)
    this.dataService.UserOrderSubmit(orderForm).subscribe(
      (data: any) => this.closeDialog(data),
    );
  }

  closeDialog(data: any) {
    if (data.status === true) {
      this.removeall();
      this.dataService.openSnackBar(data.message, 'Dismiss');
      this.router.navigateByUrl('/home');
    }
  }

  async presentAddressModal() {
    const modal = await this.modalController.create({
      component: AddressComponent,
      breakpoints: [0, 0.25, 1, 0.75],
      initialBreakpoint: 0.55,
      cssClass: 'custom-modal'
    });
    modal.onDidDismiss()
    .then((data) => {
      const value = data['data']; // Here's your selected user!
      if (value == 'address') {
        this. getUserAddressValue();
      }
      else {
      }
    });
  await modal.present();
  }

  getUserAddressValue() {
    this.dataService.getUserAddressId(this.UserId)
      .subscribe(
        data => this.getUseraddress(data),
      )
  }
  getUseraddress(data: any) {
    if (data.status == 1) {
      if (data.payload && data.payload.length > 0) {
        this.useraddress = data.payload[0];
        this.addressshowvalue = true;
      }

      else {
        this.addressshowvalue = false;
      }
    }
  }
  goingaddressapage() {
    this.modalController.dismiss();
  }

  async presentPaymentModal() {
    const modal = await this.modalController.create({
      component: PaymentpageComponent,
      componentProps: {
        address: this.useraddress,
        total: this.grandtotal
      },
      breakpoints: [0, 0.25, 1, 0.75],
      initialBreakpoint: 0.55,
      cssClass: 'custom-modal'
    });
    modal.onDidDismiss()
      .then((data) => {
        const value = data['data']; // Here's your selected user!
        if (value == 'Payment') {
          this.onSubmitForPay();
          this.modalController.dismiss('done');
        }
        else {
         
        }
      });
    await modal.present();
  }
}


