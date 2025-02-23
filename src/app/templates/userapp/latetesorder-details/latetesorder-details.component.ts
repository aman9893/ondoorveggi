import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { DataService } from '../../auth/service/data.service';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-latetesorder-details',
  templateUrl: './latetesorder-details.component.html',
  styleUrls: ['./latetesorder-details.component.scss'],
  standalone:false
})
export class LatetesorderDetailsComponent  implements OnInit {
  orderDetailsData: any;
  product_details_value: any;
  orders_id:any

  constructor(public authService:AuthService,  public dataService :DataService, private modalCtrl: ModalController,) { }

  ngOnInit() {
    this.getOrdersByid(this.orders_id);
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
    this.modalCtrl.dismiss();
  }
}
