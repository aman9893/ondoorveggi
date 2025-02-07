import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-paymentpage',
  templateUrl: './paymentpage.component.html',
  styleUrls: ['./paymentpage.component.scss'],
  standalone:false
})
export class PaymentpageComponent  implements OnInit {
  address:any;
  total:any;

  constructor(public modalController: ModalController,) { }

  ngOnInit() {
    console.log(this.address)
  }
  placeOPrder(val:any){
   this.modalController.dismiss(val);

  }

}
