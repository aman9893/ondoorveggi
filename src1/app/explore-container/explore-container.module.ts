import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ExploreContainerComponent } from './explore-container.component';
import { LoginComponent } from "./login/login.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule,ReactiveFormsModule],
  declarations: [ExploreContainerComponent,LoginComponent],
  exports: [ExploreContainerComponent]
})
export class ExploreContainerComponentModule {}
