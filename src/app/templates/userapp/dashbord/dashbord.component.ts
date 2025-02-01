import { Component, computed, inject, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { DataService } from '../../auth/service/data.service';
import { Router } from '@angular/router';
import { ProductsService } from '../services/products/products.service';
import { ActionSheetController, IonModal, ModalController, NavController } from '@ionic/angular';
import { UserCartComponent } from '../user-cart/user-cart.component';

@Component({
  selector: 'app-dashbord-user',
  templateUrl: './dashbord.component.html',
  styleUrls: ['./dashbord.component.scss'],
  standalone: false
  
})
export class DashbordComponentUser implements OnInit{
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
  categoryDataList: any;
  mobileview: boolean= false;
  banners:any
  productModelValue: boolean= false;
  productList: any;
  productArray: any;
  getCartDetails: any;
  productDetailsList: any;
  productlistpage: boolean =true;
  productdetailspage: boolean =false;
  searchText: any;
  @ViewChild(IonModal) modal!: IonModal;
  prod_id: any;
 constructor(public dataService: DataService,public authService: AuthService, private router:Router, public productService: ProductsService,public navCtrl: NavController,
  private modalCtrl: ModalController,
  private actionSheetCtrl: ActionSheetController
 ){}
  ngOnInit(): void {
    this.mobileview = this.dataService.getIsMobileResolution();
    this.banners =this.dataService.getBanners();
    this.getCategaryapiCall();
    
  }
  logout() {
    this.authService.logout();
  }

  // _______________________________________getCategaryapiCall__________________________________________________________

  getCategaryapiCall(): void {
    this.dataService.usercategoryList('').subscribe((data) => this.categoryData(data),
      (err: Error) => this.apiErrorHandal(err));
  }
 

  categoryData(data: any) {
      if(data.status == 1){
      this.categoryDataList = data.payload;
      }
  }
  // _______________________________________getCategaryapiCall end__________________________________________________________

  goToProductLIstDialogByCategaryPage(isOpen: boolean,id:any) {
      this.productModelValue = isOpen;
      this.productlistpage=true;
      this.productdetailspage =false;
      this.prod_id =id;
      this.getProductApiCall(id)
      this.cartNumberFunc();
  }

  closeProductlistModal(){
    this.productModelValue =false;
  }
  // _______________________________________getProductApiCall__________________________________________________________
    
  getProductApiCall(id:any): void {
      this.dataService.userProductcategoryList(id).subscribe((data) => this.getProductData(data),
      (err: Error) => this.apiErrorHandal(err));
  }
    getProductData(data: any) {
      this.productList = data.payload;
      console.log( this.productList)
      this.getCartDetails = JSON.parse(localStorage.getItem('localCart')!);
      this.productArray = this.productList?.map((prod: any) => { return { ...prod, qty: 1 } });
      this.productArray?.forEach((a: any) => {
        console.log('hii')
        this.getCartDetails?.forEach((b: any) => {
          if (a.prod_id === b.prod_id) {
            a.isAdded =true
          }
        });
      });
    }

 apiErrorHandal(err: any): void {
    this.dataService.openSnackBar(err,'dismiss')
  }

  // _______________________________________ go  ToProductDetailsPageByProductId end__________________________________________________________
  
  goToProductDetailsPageByProductId(isOpen: boolean,id:any) {
    this. getProductDetailsApiCall(id)
    this.productlistpage=false;
    this.productdetailspage =true;
  }


  getProductDetailsApiCall(id:any): void {
    this.dataService.getuseroductDetials(id).subscribe((data) => this.getProductDatadetails(data),
      (err: Error) => this.apiErrorHandal(err));
  }

  getProductDatadetails(data: any) {
    this.productDetailsList = data;
  }

  goToListPage(){
    this.productlistpage=true;
    this.productdetailspage =false;
  }

// _____________________________________________________Endlogic____________________________________________________________________________


  // async sortProducts() {
  //   const actionSheet = await this.actionSheetController.create({
  //     header: "Sort by",
  //     mode: "ios",
  //     cssClass: "sort-products",
  //     buttons: [{
  //       text: 'Latest Products',
  //       role: this.productService.sort.latest ? 'selected' : '',
  //       handler: () => {
  //         this.productService.applyLocalSort('id', 'asc', 'latest');
  //       }
  //     },
  //     {
  //       text: 'Price - Low to High',
  //       role: this.productService.sort.price_lth ? 'selected' : '',
  //       handler: () => {
  //         this.productService.applyLocalSort('price', 'desc', 'price_lth');
  //       }
  //     },
  //     {
  //       text: 'Price - High to Low',
  //       role: this.productService.sort.price_htl ? 'selected' : '',
  //       handler: () => {
  //         this.productService.applyLocalSort('price', 'asc', 'price_htl');
  //       }

  //     },
  //     {
  //       text: 'Cancel',
  //       icon: 'close',
  //       role: 'cancel',
  //       handler: () => {
  //         console.log('Cancel clicked');
  //       }
  //     }
  //     ]
  //   });
  //   await actionSheet.present();
  // }
      
  inc(prod: any) {
    prod.qty! += 1
  }
  dec(prod: any) {
    if (prod.qty != 1) {
      prod.qty! -= 1
    }
  }
// _____________________________________________________Add to cart start____________________________________________________________________________


async presentModal() {
  // this.closeProductlistModal()
  const modal = await this.modalCtrl.create({
    component: UserCartComponent,
    breakpoints: [0, 0.25, 1, 0.75],
    initialBreakpoint: 0.55,
    cssClass: 'custom-modal'
  });
  await modal.present();
}


  itemsCart: any= [];

  addCart(productValue: any) {
    console.log('esto es en addCart', productValue)
    console.log('esto es en addCart', this.productArray)
    let cartDataNull =localStorage.getItem('localCart');
    if (cartDataNull == null) {
      let storeDataGet: any[] = [];
      storeDataGet.push(productValue);
      localStorage.setItem('localCart',JSON.stringify(storeDataGet));
    }
    else {
      let id = productValue.prod_id;
      let index: number = -1;
      this.itemsCart =JSON.parse(localStorage.getItem('localCart')!);
      for(let i = 0; i < this.itemsCart.length;i++) {
        if (id ==this.itemsCart[i].prod_id) {
          this.itemsCart[i].qty = productValue.qty
          index = i;
          break;
        }
      }
      if (index == -1) {
        this.itemsCart.push(productValue);
        localStorage.setItem ('localCart', JSON.stringify (this.itemsCart));
      }
      else {
        localStorage.setItem('localCart', JSON.stringify (this.itemsCart));
      }
    }
    this.cartNumberFunc();
    this.getProductApiCall(this.prod_id)
  }

  cartNumber: number = 0;

  cartNumberFunc() {
    let cartValue =JSON.parse(localStorage.getItem('localCart')!);
    this.getProductApiCall(this.prod_id)
    console.log(  this.cartNumber)
    this.cartNumber =cartValue?.length;
    this.dataService.cartSubject.next(this.cartNumber);
  }
 
  }
 



  