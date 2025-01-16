import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MenulistComponent } from './templates/admin/menulist/menulist.component';
import { ReactiveFormsModule } from '@angular/forms';
@NgModule({
  declarations: [AppComponent,MenulistComponent],
  imports: [BrowserModule,IonicModule.forRoot(), AppRoutingModule,HttpClientModule,MatButtonModule, MatInputModule,ReactiveFormsModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideAnimationsAsync()],
  bootstrap: [AppComponent],
})
export class AppModule {}
