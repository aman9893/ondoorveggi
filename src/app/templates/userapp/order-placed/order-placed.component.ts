import { AfterViewInit, Component, ElementRef, inject, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { ActionSheetController, IonModal, MenuController, ModalController, NavController, PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-order-placed',
  templateUrl: './order-placed.component.html',
  styleUrls: ['./order-placed.component.scss'],
  standalone:false
})
export class OrderPlacedComponent  implements OnInit ,AfterViewInit{

  readonly dialogRef = inject(MatDialogRef<OrderPlacedComponent>);

  showNoti:boolean=true;
  showNotitwo:boolean=true;
  constructor(private popnotioverCtrl: PopoverController) {}

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
  }, 8000);
}

  ngOnInit() {
  }
  dismissModal(){
    this.dialogRef.close();
  }


}
