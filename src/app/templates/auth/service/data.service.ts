import { EventEmitter, Injectable } from '@angular/core';
import { HttpClient } from  '@angular/common/http';
import { apiConfig } from '../../api-path/api-config';
import { MatSnackBar } from '@angular/material/snack-bar';
import { BehaviorSubject, Subject } from 'rxjs';
import {Location} from '@angular/common';
import { CapacitorHttp, HttpResponse } from '@capacitor/core';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private http :HttpClient,private snackBar: MatSnackBar,private _location: Location,) { 
    if (window.innerWidth < 768) {
      this.isMobileResolution = true;
    } else {
      this.isMobileResolution = false;
    }
  }
  cartEvent: EventEmitter<any> = new EventEmitter();


  cartDataList: any = [];
  productList = new BehaviorSubject<any>([]);
  cartlist = new BehaviorSubject<any>([]);
  cartSubject = new Subject<number>();

  productdialog: EventEmitter<any> = new EventEmitter();

  productCartValueUpdate: EventEmitter<any> = new EventEmitter();

  upadteAddress: EventEmitter<any> = new EventEmitter();


    banners = [
    { id: '1', banner: 'assets/banners/1.jpg', active: true },
    { id: '2', banner: 'assets/banners/2.jpg', active: true },
    { id: '3', banner: 'assets/banners/3.jpg', active: true },
  ];


  getBanners() {
    return this.banners;
  }
  // user Apis
  backClicked() {
    this._location.back();
  }

  userloginData(data:any) {
    return this.http.post(apiConfig.localhostUrl + apiConfig.userloginApi, data);
  }
  
  usercategoryList(data:any) {
    return this.http.post(apiConfig.localhostUrl + apiConfig.usercategory_list, data);
  }
  
  userProductcategoryList(id:any) {
    let data:any={cat_id:id};

    return this.http.post(apiConfig.localhostUrl + apiConfig.userproduct_category_list, data);
  }
  
  getuseroductDetials(prodid:any) {
    let data:{prod_id:any}={prod_id:prodid};
    return this.http.post(apiConfig.localhostUrl + apiConfig.userdetailsproduct,data);
  }
  
  getUserProfileDataById(userid:any){
    let data:{user_id:any}={user_id:userid};
    return this.http.post(apiConfig.localhostUrl + apiConfig.userProfileApi,data);
  }

  updateUserProfile(data:any){
    return this.http.post(apiConfig.localhostUrl + apiConfig.updateuserProfileData,data);
  }

  userAddressSave(data:any){
    return this.http.post(apiConfig.localhostUrl + apiConfig.userAddressSave,data);
  }

  userUpdateAddressSave(data:any){
    return this.http.post(apiConfig.localhostUrl + apiConfig.update_delivery_address,data);
  }
  getUserAddressId(userid:any){
    let data:{user_id:any}={user_id:userid};
    return this.http.post(apiConfig.localhostUrl + apiConfig.userAddressFetch,data);
  }

  UserOrderSubmit(data:any){
    return this.http.post(apiConfig.localhostUrl + apiConfig.userAddOrder,data);
  }

  getUserOrdersData(UserId:any){
    let data:{user_id:any}={user_id:UserId};
    return this.http.post(apiConfig.localhostUrl + apiConfig.userOrderlist,data);
  }
  getUserLastOrdersData(UserId:any){
    let data:{user_id:any}={user_id:UserId};
    return this.http.post(apiConfig.localhostUrl + apiConfig.userLastOrderlist,data);
  }

  

  getUserOrdersDataById(orderid:any){
    console.log(orderid)
    let data:{orderid:any}={orderid:orderid};
    return this.http.post(apiConfig.localhostUrl + apiConfig.userOrderlistByid,data);
  }

  deleteUserAddress(address_id:any){
    let data:{address_id:any}={address_id:address_id};
    return this.http.post(apiConfig.localhostUrl + apiConfig.UserAddreesDelete,data);

  }



  inProduct(product:any) {
    for (let p of this.cartDataList) {
      if (p.menu_id === product.menu_id) {
        p.qty += 1;
        p.total=  parseInt(p.qty)*parseInt(p.menu_price);
        this.productList.next(this.cartDataList);
        this.getTotalAmount();
  
      }
   
  }
   
  }
 
  decreaseProduct(product:any) {
    let added = false;
    for (let  p of this.cartDataList) {
      if (p.menu_id === product.menu_id) {
        p.qty -= 1;
        if ( p.qty === 0) {
         this.removeCart(p)
				}
        this.getTotalAmount();

        this.productList.next(this.cartDataList);
        break;
      }
    }
  }
 
  // Remove product one by one
  removeCart(product: any) {
    this.cartDataList.map((a: any, index: any) => {
      if (product.menu_id === a.menu_id) {
        this.cartDataList.splice(index, 1);
      }
    })
  }

  

  getProductData() {
    return this.productList.asObservable();
  }
  // Add products to cart
  addToCart(product: any) {
    console.log(product);
    let isDuplicate = false;
    for(let i=0; i<this.cartDataList.length;i++){
       if(product.prod_id == this.cartDataList[i].prod_id){
        isDuplicate =true;
         break;
        }
   }
   if(!isDuplicate ){
    this.cartDataList.push(product);
    console.log(this.cartDataList);
    this.productList.next(this.cartDataList);
     }

  }

  // Calculate total amount
  getTotalAmount() {
    let totalSum = 0;
    for (let i=0; i<this.cartDataList.length;i++) {
      totalSum +=  parseInt(this.cartDataList[i].total);
    }
    return  totalSum ;

  }

  // Remove product one by one
  removeCartData(product: any) {
    this.cartDataList.map((a: any, index: any) => {
      if (product.prod_id === a.prod_id) {
        this.cartDataList.splice(index, 1);
      }
    })
  }

  // Empties the whole cart
  removeAllCart() {
    this.cartDataList = [];
    this.productList.next(this.cartDataList);
  }


  print(content: string) {
    return this.http.post(apiConfig.localhostUrl + apiConfig.printer, content );
  }
  

 
  registerData(data:any) {
    return this.http.post(apiConfig.localhostUrl + apiConfig.registerData, data);
  }
  loginData(data:any) {
    return this.http.post(apiConfig.localhostUrl + apiConfig.loginData, data);
  }
  updateData(data:any) {
    return this.http.put(apiConfig.localhostUrl + apiConfig.updateUser, data);
  }
  getAdminProfileDataById(id:any){
    return this.http.get(apiConfig.localhostUrl+apiConfig.getAdminProfile + '/' + id);
   }
   forgetPassData(data:any) {
    return this.http.post(apiConfig.localhostUrl + apiConfig.forgetPasswordData, data);
  }
  updatePassword(data:any){
    return this.http.post(apiConfig.localhostUrl+apiConfig.updatePassword,data);
  }
  getAllusers(){
    return this.http.get(apiConfig.localhostUrl+apiConfig.getAllusers);
  }
//---------------------------------------------------------------------------------

  updateTable(data:any){
    return this.http.put(apiConfig.localhostUrl + apiConfig.updateTable, data);
  }
  deleteTable(id:any){
    return this.http.delete(apiConfig.localhostUrl + apiConfig.delete_table+'/'+id);
  }
  saveTable(data:any){
    return this.http.post(apiConfig.localhostUrl + apiConfig.addTable, data);
  }
  getTableInfo() {
    return this.http.get(apiConfig.localhostUrl + apiConfig.getTable);
  }

  getMonthlyData() {
    return this.http.get(apiConfig.localhostUrl + apiConfig.getMonthlyData);
  }
//---------------------------------------------------------------------------------
  updateAttender(data:any){
    return this.http.put(apiConfig.localhostUrl + apiConfig.update_attender, data);
  }
  deleteAttender(id:any){
    return this.http.delete(apiConfig.localhostUrl + apiConfig.delete_attender+'/'+id);
  }
  saveAttender(data:any){
    return this.http.post(apiConfig.localhostUrl + apiConfig.add_attender, data);
  }
  getAttenderInfo() {
    return this.http.get(apiConfig.localhostUrl + apiConfig.get_attender);
  }
//////////////////////////////menu ///////////////////////////////////
  ///////////////////////////table ////////////////////////////////////////
  updateCategory(data:any){
    return this.http.post(apiConfig.localhostUrl + apiConfig.updatecategory_list, data);
  }
  deletecategoryList(cat_id:any){
    let data:{cat_id:any}={cat_id:cat_id};
    return this.http.post(apiConfig.localhostUrl + apiConfig.deletecategoryList,data);
  }
  adddcategoryList(data:any){
    return this.http.post(apiConfig.localhostUrl + apiConfig.addcategory, data);
  }
  getcategoryList() {
    return this.http.post(apiConfig.localhostUrl + apiConfig.category_list,{});
  }
//////////////////////////////menu ///////////////////////////////////


  updateMenu(data:any){
    return this.http.post(apiConfig.localhostUrl + apiConfig.updateMenu, data);
  }
  deleteMenu(prodid:any){
    let data:{prod_id:any}={prod_id:prodid};
    return this.http.delete(apiConfig.localhostUrl + apiConfig.deleteMenu+'/'+prodid);
  }
  saveMenu(data:any){
    return this.http.post(apiConfig.localhostUrl + apiConfig.addMenu, data);
  }
  getMenuInfo() {
    return this.http.post(apiConfig.localhostUrl + apiConfig.getMenu,{});
  }
  getMenuproductDetials(prodid:any) {
    let data:{prod_id:any}={prod_id:prodid};
    return this.http.post(apiConfig.localhostUrl + apiConfig.detailsproduct,data);
  }
  getMenuFilterById(id:any){
    return this.http.get(apiConfig.localhostUrl + apiConfig.filterMenu+'/'+id);
  }

///////////
getallcount(){
  return this.http.get(apiConfig.localhostUrl + apiConfig.getallcount);
}
///////////////////////////////////////////////////////////////////////

updateBill(data:any){
  return this.http.put(apiConfig.localhostUrl + apiConfig.updateBill, data);
}
updateTableStaus(data:any){
  return this.http.put(apiConfig.localhostUrl + apiConfig.updateBill, data);
}
deleteBill(id:any){
  return this.http.delete(apiConfig.localhostUrl + apiConfig.deleteBill+'/'+id);
}

deleteUser(id:any){
  return this.http.delete(apiConfig.localhostUrl + apiConfig.deleteUser+'/'+id);
}
saveBill(data:any){
  return this.http.post(apiConfig.localhostUrl + apiConfig.addBill, data);
}
getBillInfo() {
  return this.http.get(apiConfig.localhostUrl + apiConfig.getBill);
}

getTodayBillInfo() {
  return this.http.get(apiConfig.localhostUrl + apiConfig.today_bill_list);
}

compelteOrder(tableFormData:any){
  return this.http.put(apiConfig.localhostUrl + apiConfig.completeorder,tableFormData);
}

getBillByTableID(id:any){
  return this.http.get(apiConfig.localhostUrl + apiConfig.getbillByID+'/'+id);
  
}
getBillByBillID(id:any){
  return this.http.get(apiConfig.localhostUrl + apiConfig.getBillbasedBillId+'/'+id);
  
}
/////////////////////////////////////////////////////////////////////


  
getConatctList(){
  return this.http.get(apiConfig.localhostUrl+apiConfig.contactbook_list);
}
lasttokenno(){
  return this.http.get(apiConfig.localhostUrl+apiConfig.lasttoken);
}
addConatctBook(data:any){
  return this.http.post(apiConfig.localhostUrl+apiConfig.addcontactBook,data);
}

 deleteConatctitem(id:any){
  return this.http.delete(apiConfig.localhostUrl+apiConfig.deleteContactList+ '/' + id);
}
updateConatactItem(data:any){
  return this.http.put(apiConfig.localhostUrl+apiConfig.update_contact_list, data);
}


openSnackBar(message: string, action: string) {
  this.snackBar.open(message, action, {
    duration: 5000,
    panelClass: ['app-bottom-snackbar'],
  });
}

userData:any;

phoneValidation(){
  return  /^[0-9]*(\.[0-9]+)?$/;
}

numberValidation(){
  return  /^[0-9]*(\.[0-9]+)?$/;
}

emailValidation(){
 return  /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/
}


private isMobileResolution: boolean = false;


public getIsMobileResolution(): boolean {
  return this.isMobileResolution;
}


//==================================khata book==============================

addKhatabookList(data:any){
  return this.http.post(apiConfig.localhostUrl+apiConfig.addkhatabook,data);
}
getKhatalist(){
  return this.http.get(apiConfig.localhostUrl+apiConfig.khatabooklist);
}

addKhataAmount(data:any){
  return this.http.post(apiConfig.localhostUrl+apiConfig.addKhataAmount,data);
}
getKhataAmountlist(id:any){
  return this.http.get(apiConfig.localhostUrl+apiConfig.khataAmountbooklist+'/'+id );
}

deleteKhataHIsab(request_id:any){
  return this.http.delete(apiConfig.localhostUrl+apiConfig.deleteKhataHisab + '/' + request_id);
}

deleteCustomer(request_id:any){
  return this.http.delete(apiConfig.localhostUrl+apiConfig.deleteKhatacustomer + '/' + request_id);
}

updatetax(data:any){
  return this.http.put(apiConfig.localhostUrl + apiConfig.updateTax, data);
}
deletetax(id:any){
  return this.http.delete(apiConfig.localhostUrl + apiConfig.deleteTax+'/'+id);
}
saveTax(data:any){
  return this.http.post(apiConfig.localhostUrl + apiConfig.addtax, data);
}
getTaxInfo() {
  return this.http.get(apiConfig.localhostUrl + apiConfig.taxBooklist);
}

}




