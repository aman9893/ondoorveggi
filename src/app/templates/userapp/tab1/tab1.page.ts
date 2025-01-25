import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActionSheetController, IonRouterOutlet, ModalController } from '@ionic/angular';
import { ProductFilterPage } from '../pages/product-filter/product-filter.page';
import { ProductsService } from '../services/products/products.service';
import { DataService } from '../../auth/service/data.service';
@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  standalone: false
})
export class Tab1Page implements OnInit {

  bannerImages: any = [];
  mobileview: boolean = false;
  productList: any;
  productArray: any;
  getCartDetails: any;

  constructor(
    public productService: ProductsService,
    public routerOutlet: IonRouterOutlet,
    public modalCtrl: ModalController,
    private router: Router,
    private actionSheetController: ActionSheetController,
    private dataService: DataService
  ) {

  }
  ngOnInit(): void {
    this.mobileview = this.dataService.getIsMobileResolution();
    this.productService.initProductList();
    this.getProductApiCall();
    this.cartNumberFunc();

  }
  search(event: any) {
    let term = event.target.value;
    this.productService.searchProducts(term);
  }

  getProductApiCall(): void {
    this.dataService.getMenuInfo().subscribe((data) => this.getProductData(data),
      (err: Error) => this.errorcall(err));
  }
  errorcall(err: Error): void {
    throw new Error('Method not implemented.');
  }
  getProductData(data: any) {
    this.productList = data.payload;
    this.productArray = this.productList.map((prod: any) => { return { ...prod, qty: 1 } });
    this.getCartDetails = JSON.parse(localStorage.getItem('localCart')!);

    this.productArray.forEach((a: any) => {
      this.getCartDetails.forEach((b: any) => {
        if (a.prod_id === b.prod_id) {
          a.isAdded =true
        }
      });
    });


  }

  inc(prod: any) {
    prod.qty! += 1
  }
  dec(prod: any) {
    if (prod.qty != 1) {
      prod.qty! -= 1

    }

  }
  itemsCart: any[] = [];
  addCart(category: any) {
   
    console.log('esto es en addCart', this.productArray)
    let cartDataNull =localStorage.getItem('localCart');
    if (cartDataNull == null) {
      let storeDataGet: any[] = [];
      storeDataGet.push(category);
      localStorage.setItem('localCart',JSON.stringify(storeDataGet));
    }
    else {
      let id = category.prod_id;
      let index: number = -1;
      this.itemsCart =JSON.parse(localStorage.getItem('localCart')!);
      for
        (let i = 0; i < this.itemsCart.length;
        i++) {
        if (id ==this.itemsCart[i].prod_id) {
          this.itemsCart[i].qty =
          category.qty
          index = i;
          break;
        }
      }
      if (index == -1) {
        this.itemsCart.push(category);
        localStorage.setItem
          ('localCart', JSON.stringify
            (this.itemsCart));
      }
      else {
        localStorage.setItem
          ('localCart', JSON.stringify
            (this.itemsCart));
      }
    }
    this.cartNumberFunc();
  }

  cartNumber: number = 0;

  cartNumberFunc() {
    let cartValue =
      JSON.parse
        (localStorage.getItem
          ('localCart')!);
    this.cartNumber =
      cartValue.length;
    this.dataService.cartSubject.next(this.cartNumber);
    this. getProductApiCall()

  }
















  goToProductDetails(id: any) {
    this.router.navigate(['/products', id]);
  }

  addToCartproduct(item: any) {
    this.productList.forEach((element: any) => {
      if (element.prod_id == item.prod_id) {
        element.isAdded = true;
      }
      else {
        // element.isAdded = false;
      }

    });
    this.dataService.addToCart(item);
  }

  async filterPage() {
    const modal = await this.modalCtrl.create({
      component: ProductFilterPage,
      presentingElement: this.routerOutlet.nativeEl
    });

    await modal.present();
    await modal.onWillDismiss().then((result) => {
    }).catch((err) => {
      console.log('err :>> ', err);
    });
  }

  async sortProducts() {
    const actionSheet = await this.actionSheetController.create({
      header: "Sort by",
      mode: "ios",
      cssClass: "sort-products",
      buttons: [{
        text: 'Latest Products',
        role: this.productService.sort.latest ? 'selected' : '',
        handler: () => {
          this.productService.applyLocalSort('id', 'asc', 'latest');
        }
      },
      {
        text: 'Price - Low to High',
        role: this.productService.sort.price_lth ? 'selected' : '',
        handler: () => {
          this.productService.applyLocalSort('price', 'desc', 'price_lth');
        }
      },
      {
        text: 'Price - High to Low',
        role: this.productService.sort.price_htl ? 'selected' : '',
        handler: () => {
          this.productService.applyLocalSort('price', 'asc', 'price_htl');
        }

      },
      {
        text: 'Cancel',
        icon: 'close',
        role: 'cancel',
        handler: () => {
          console.log('Cancel clicked');
        }
      }
      ]
    });
    await actionSheet.present();
  }


}
