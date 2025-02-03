import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { DataService } from '../../auth/service/data.service';

@Component({
  selector: 'app-userorderlist',
  templateUrl: './userorderlist.component.html',
  styleUrls: ['./userorderlist.component.scss'],
  standalone:false
})
export class UserorderlistComponent  implements OnInit {
  UserId: any;
  orderData: any;
  updateFlag: boolean =false;
  orderdatalist: any=[];
  showdetails=false;
  showorder=true;
  orderDetailsData: any;
  product_details_value: any;

  constructor(public authService:AuthService,  public dataService :DataService,) { }

  ngOnInit() {
    this.UserId = this.authService.getUserId();
    this.getUserOrders() 
  }
  getUserOrders() {
    this.dataService.getUserOrdersData(this.UserId).subscribe((data) => this.getUserOrderslist(data));
  }

  getUserOrderslist(data:any) {
    this.orderdatalist=[];
     this.orderdatalist = data;
     console.log(  this.orderdatalist)
     this.updateFlag =true;
  }

  showOrderDetilas(showdetails:any,orderid:any){
    console.log(orderid)
     this.showdetails =true;
     this.showorder =false;
     this.getOrdersByid(orderid) 
  }


  getOrdersByid(orderid:any) {
    this.dataService.getUserOrdersDataById(orderid).subscribe((data) => this.getUserOrderslistByid(data));
  }

  getUserOrderslistByid(data:any) {
     let orderDetails = data.payload;

     this.product_details_value=(JSON.parse(orderDetails.product_details));
     this.orderDetailsData=orderDetails;
     console.log(  this.product_details_value)
     console.log(  this.orderDetailsData)
  }
  backlistpage(){
    this.showdetails =false;
    this.showorder =true;
  }
}
