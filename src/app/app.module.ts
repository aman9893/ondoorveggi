import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { MatIconModule } from '@angular/material/icon';
import { MatSelectModule } from '@angular/material/select';
import { MatTabsModule } from '@angular/material/tabs';
import { MatChipsModule } from '@angular/material/chips';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { CommonModule } from '@angular/common';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatDialogModule } from '@angular/material/dialog';
import { MatMenuModule } from '@angular/material/menu';
import { MatSortModule } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatRadioModule } from '@angular/material/radio';
import { MatCheckboxModule } from '@angular/material/checkbox';
import {MatButtonModule} from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import {MatToolbarModule} from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatListModule } from '@angular/material/list';
import { CategiresComponent } from './templates/admin/pages/categires/categires.component';
import { HeaderComponent } from './templates/admin/pages/header/header.component';
import { ConfrimBoxComponent } from './templates/admin/pages/confrim-box/confrim-box.component';
import { PageHeaderComponent } from './templates/admin/pages/dashbord/page-header/page-header.component';
import { CourseRivePageModule } from './templates/course-rive/course-rive.module';
import { TokenInterService } from './templates/auth/token-inter.service';
import { LoaderInterceptor } from './templates/auth/service/service/LoaderInterceptor';
import { MenulistComponent } from './templates/admin/pages/menulist/menulist.component';

@NgModule({
  declarations: [AppComponent,MenulistComponent,CategiresComponent,HeaderComponent,ConfrimBoxComponent,PageHeaderComponent,],
  imports: [BrowserModule,IonicModule.forRoot(), AppRoutingModule,HttpClientModule,MatButtonModule,ReactiveFormsModule,CourseRivePageModule,
     MatInputModule,ReactiveFormsModule,MatToolbarModule,MatProgressSpinnerModule,
 MatSnackBarModule,
 FormsModule,
 MatIconModule,
 MatSelectModule,
MatTabsModule,
 MatChipsModule,
MatTableModule, MatPaginatorModule,
CommonModule,
MatAutocompleteModule,MatDialogModule ,MatMenuModule,MatSortModule,MatCardModule,
MatSidenavModule,MatListModule,MatExpansionModule , MatRadioModule,MatCheckboxModule 
  ]
  ,
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideAnimationsAsync(),{provide: HTTP_INTERCEPTORS, useClass: TokenInterService, multi: true},{ provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {}
