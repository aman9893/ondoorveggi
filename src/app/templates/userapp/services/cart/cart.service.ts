import { Injectable } from '@angular/core';
import { UtilityService } from '../utility/utility.service';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  filter(arg0: (item: any) => boolean): CartService {
    throw new Error('Method not implemented.');
  }

  items: any = [];
  item: any;
  total_price: number = 0;
  total_cart_qty:number = 0;
  unseen: number = 0;

  constructor(
    private utility: UtilityService) { }

  placeItem(product: any) {
    this.item = null;
    this.item = product;
  }

  isAddedToCart(id: any) {
    return this.items.some((item: { [x: string]: any; }) => item['id'] == id );
  }

  getCartTotalQty() {
    console.log(this.items);
    this.total_cart_qty = 0;

    for (let item of this.items) {
      this.total_cart_qty += item['cartQuantity'];
    }
  }

  addToCart() {
    if ( this.item['cartQuantity'] > 0 ) { 
      this.addLocalCartItems();
    }
  }

  increaseCartQty(index: string | number) {
    //this.utility.presentLoading('Add quantity...');
    let increasedQty = this.items[index]['cartQuantity'] + 1;

    if ( increasedQty <= this.items[index]['totalStock'] ) {
     
      this.increaseLocalCartItem( index );
      this.getCartTotalQty();

    } else {
      //this.utility.dismissLoading();
      this.utility.showToast("More Stock is not available!", "top");
    }
    
  }

  decreaseCartQty(index: string | number) {
    //this.utility.presentLoading('Decrease quantity...');
    let decreasedQty = this.items[index]['cartQuantity'] - 1;

    if ( decreasedQty >= 1 ) {
      this.decreaseLocalCartItem( index );
      this.getCartTotalQty();

    } else {
      //this.utility.dismissLoading();
      this.utility.showToast("Quantity can't be less than Min order Quantity", "top");
    }
    
  }

  removeItem(index: any) {
    this.removeLocalCartItem(index);
  }

  /* Handle cart locally with below methods */
  increaseLocalCartItem(index: string | number) {
    this.items[index]['cartQuantity'] += 1;
    this.total_price += this.items[index]['price'];
  }

  decreaseLocalCartItem(index: string | number) {
    this.items[index]['cartQuantity'] -= 1;
    this.total_price -= this.items[index]['price'];
  }

  removeLocalCartItem(index: string | number) {
    this.total_price -= this.calculatePrice(this.items[index]);
    this.items.splice(index, 1);
  }

  addLocalCartItems() {
    this.unseen += 1;
    console.log('add to cart>:', this.items, this.item);
    let index = this.items.length > 0 ? this.items.findIndex((value: { id: any; }) => value.id === this.item.id) : -1;
   
    if ( index > -1 ) {
      console.log(this.items[index]['cartQuantity'], this.item['cartQuantity']);
      this.items[index]['cartQuantity'] += this.item['cartQuantity'];
    } else {
      this.items.push(this.item);
    } 
  }

  totalPrice() {
    this.total_price = 0;

    for ( let item of this.items ) {
      this.total_price += this.calculatePrice(item);
    }
  }

  calculatePrice(product: { [x: string]: any; }) {
    let price = product['price'];
    return Number(product['cartQuantity']) * Number(price); 
  }
  
  resetCart() {
    this.items = [];
    this.item = null;
  }
}
