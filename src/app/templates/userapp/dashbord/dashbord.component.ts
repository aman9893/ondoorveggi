import { Component, computed, inject, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { DataService } from '../../auth/service/data.service';
import { Router } from '@angular/router';
import { ActionSheetController, IonModal, MenuController, ModalController, NavController, PopoverController } from '@ionic/angular';
import { UserCartComponent } from '../user-cart/user-cart.component';
import { AddressComponent } from '../address/address.component';
import { OrderPlacedComponent } from '../order-placed/order-placed.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-dashbord-user',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss'],
  standalone: false

})
export class DashbordComponentUser implements OnInit {
  categoryDataList: any;
  mobileview: boolean = false;
  banners: any
  productModelValue: boolean = false;
  productList: any;
  productArray: any;
  getCartDetails: any;
  productDetailsList: any;
  productlistpage: boolean = true;
  productdetailspage: boolean = false;
  searchText: any;
  @ViewChild(IonModal) modal!: IonModal;
  prod_id: any;
  useraddress: any;
  addressshowvalue: boolean = false;
  UserId: any;
  catname: any;
  readonly dialog = inject(MatDialog);
  constructor(public dataService: DataService, public authService: AuthService, public route: Router,
    public menuCtrl: MenuController, private router: Router, public navCtrl: NavController,
    private modalCtrl: ModalController,private popoverCtrl: PopoverController,
  ) {
    this. cartValueUpdate();
  }
  ngOnInit(): void {
    this.UserId = this.authService.getUserId();
    this.mobileview = this.dataService.getIsMobileResolution();
    this.banners = this.dataService.getBanners();
    this.getCategaryapiCall();
    this.getUserAddressValue();
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

  async presentModalAddress() {
    const modal = await this.modalCtrl.create({
      component: AddressComponent,
      breakpoints: [0, 0.25, 1, 0.75],
      initialBreakpoint: 0.55,
      cssClass: 'custom-modal'
    });
    await modal.present();
  }

  logout() {
    this.authService.logout();
  }
  openMenu() {
    this.menuCtrl.open();
  }
  openEnd() {
    this.menuCtrl.close();
  }
  // _______________________________________getCategaryapiCall__________________________________________________________


  getCategaryapiCall(): void {
    this.dataService.usercategoryList('').subscribe((data) => this.categoryData(data),
      (err: Error) => this.apiErrorHandal(err));
  }


  categoryData(data: any) {
    if (data.status == 1) {
      this.categoryDataList = data.payload;
    }
  }
  // _______________________________________getCategaryapiCall end__________________________________________________________

  goToProductLIstDialogByCategaryPage(isOpen: boolean, id: any, catname: any) {
    this.catname = catname;
    this.productModelValue = isOpen;
    this.productlistpage = true;
    this.productdetailspage = false;
    this.prod_id = id;
    this.getProductApiCall(id)
    this.cartNumberFunc();
  }

  closeProductlistModal() {
    this.productModelValue = false;
  }
  // _______________________________________getProductApiCall__________________________________________________________

  getProductApiCall(id: any): void {
    this.dataService.userProductcategoryList(id).subscribe((data) => this.getProductData(data),
      (err: Error) => this.apiErrorHandal(err));
  }
  getProductData(data: any) {
    this.productList = data.payload;
    this.getCartDetails = JSON.parse(localStorage.getItem('localCart')!);
    this.productArray = this.productList?.map((prod: any) => { return { ...prod, qty: 1 } });
    this.productArray?.forEach((a: any) => {
      this.getCartDetails?.forEach((b: any) => {
        if (a.prod_id === b.prod_id) {
          a.isAdded = true
        }
      });
    });
  }

  apiErrorHandal(err: any): void {
    this.dataService.openSnackBar(err, 'dismiss')
  }

  // _______________________________________ go  ToProductDetailsPageByProductId end__________________________________________________________

  goToProductDetailsPageByProductId(isOpen: boolean, id: any) {
    this.getProductDetailsApiCall(id)
    this.productlistpage = false;
    this.productdetailspage = true;
  }


  getProductDetailsApiCall(id: any): void {
    this.dataService.getuseroductDetials(id).subscribe((data) => this.getProductDatadetails(data),
      (err: Error) => this.apiErrorHandal(err));
  }

  getProductDatadetails(data: any) {
    const datalist = {
      qty: 1,
      isAdded: false,
    }
    const updateDetials = { ...data, ...datalist }
    this.productDetailsList = updateDetials;
    console.log(this.productDetailsList)
    this.cartNumberFunc();
  }

  goToListPage() {
    this.productlistpage = true;
    this.productdetailspage = false;
  }

  // _____________________________________________________=================Endlogic======================____________________________________________


  // _____________________________________________________Add to cart start__________________________________________________________________________


  async presentViewCartModal() {
    const modal = await this.modalCtrl.create({
      component: UserCartComponent,
      breakpoints: [0, 0.25, 1, 0.75],
      initialBreakpoint: 0.55,
      componentProps: {
        address: this.useraddress,
        catname: this.catname
      },
      cssClass: 'custom-modal'
    });

    modal.onDidDismiss()
      .then((data) => {
        const value = data['data']; // Here's your selected user!
        if (value == 'done') {
          this.closeProductlistModal();
          this.openDialog('2000ms', '1000ms');
        }
        else {
        }
      });
    await modal.present();
  }
  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(OrderPlacedComponent, {
      maxWidth: '100vw',
      maxHeight: '100vh',
      height: '100%',
      width: '100%',
      panelClass: 'full-screen-modal',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

  // __________________________________________________________________________________________________________



  itemsCart: any = [];

  addCart(productValue: any) {
    let cartDataNull = localStorage.getItem('localCart');
    if (cartDataNull == null) {
      let storeDataGet: any[] = [];
      storeDataGet.push(productValue);
      localStorage.setItem('localCart', JSON.stringify(storeDataGet));
    }
    else {
      let id = productValue.prod_id;
      let index: number = -1;
      this.itemsCart = JSON.parse(localStorage.getItem('localCart')!);
      for (let i = 0; i < this.itemsCart.length; i++) {
        if (id == this.itemsCart[i].prod_id) {
          this.itemsCart[i].qty = productValue.qty
          index = i;
          break;
        }
      }
      if (index == -1) {
        this.itemsCart.push(productValue);
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      }
      else {
        localStorage.setItem('localCart', JSON.stringify(this.itemsCart));
      }
    }
    this.cartNumberFunc();
  }

  cartValueUpdate(){
    this.dataService.productCartValueUpdate.subscribe((data:any) => this.cartUpdateValue(data),
    (err: Error) => this.apiErrorHandal(err));

  }

  cartUpdateValue(val:any){
    this.cartNumberFunc() 
  }


  cartNumber: number = 0;

  cartNumberFunc() {
    let cartValue = JSON.parse(localStorage.getItem('localCart')!);
    this.getProductApiCall(this.prod_id)
    this.cartNumber = cartValue?.length;
    this.getCartDetails?.forEach((b: any) => {
      if (this.productDetailsList?.prod_id === b.prod_id) {
        this.productDetailsList.isAdded = true
      }
    });
  }

}
