import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../../auth/service/data.service';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { LatetesorderDetailsComponent } from '../latetesorder-details/latetesorder-details.component';

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrls: ['./order-placed.component.scss'],
  standalone:false
})
export class OrderPlacedComponent  implements OnInit {


  showNoti:boolean=true;
  showNotitwo:boolean=true;
  UserId: any;
  orderdatalist:any=[];
  product_details_value: any;
  constructor( public dataService :DataService,public authService: AuthService,private router: Router, private modalCtrl: ModalController,) {}

  audioPath =
  'https://notificationsounds.com/storage/sounds/file-sounds-881-look-this-is-what-i-was-talking-about.mp3';
@ViewChild('audio') audio!: ElementRef ;
@ViewChild('options') text!: ElementRef;
@ViewChild('button') btn!: ElementRef;

ngAfterViewInit(): void {

  setTimeout(() => {
    this.showNoti=false;
    this.audio.nativeElement.play();
    this.btn.nativeElement.click();
    this.audio.nativeElement.play();
  }, 4000);
}

  ngOnInit() {
    this.UserId = this.authService.getUserId();
    this.getUserOrders();
  }
  
  dismissModal(){
    this.router.navigate(['/home']);
  }
  getUserOrders() {
    this.dataService.getUserOrdersData(this.UserId).subscribe((data) => this.getUserOrderslist(data));
  }

  getUserOrderslist(data:any) {
     this.orderdatalist=[];
     this.orderdatalist = data[0];
     console.log(  this.orderdatalist)
     this.product_details_value=(JSON.parse(this.orderdatalist.product_details));
     console.log(  this.product_details_value)
  }
  async presentViewOrderModal() {
    const modal = await this.modalCtrl.create({
      component: LatetesorderDetailsComponent,
      breakpoints: [0, 0.25, 1, 0.75],
      initialBreakpoint: 0.7,
      componentProps: {
        orders_id: this.orderdatalist.orders_id,
        orderpage: true
      },
      cssClass: 'custom-modal'
    });

    modal.onDidDismiss()
      .then((data) => {
        const value = data['data']; // Here's your selected user!
        if (value == 'done') {
        }
        else {
        }
      });
    await modal.present();
  }
}
