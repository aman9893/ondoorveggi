import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-help-suppport',
  templateUrl: './help-suppport.component.html',
  styleUrls: ['./help-suppport.component.scss'],
  standalone: false

})
export class HelpSuppportComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}
  public toggleStateValue: boolean = true;

  public toggleState(){
    this.toggleStateValue = !this.toggleStateValue;
  }
}
