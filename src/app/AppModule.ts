import { CommonModule } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDialogModule } from '@angular/material/dialog';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { RouteReuseStrategy } from '@angular/router';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InvoiceComponent } from './templates/admin/pages/bill/invoice/invoice.component';
import { CategiresComponent } from './templates/admin/pages/categires/categires.component';
import { ConfrimBoxComponent } from './templates/admin/pages/confrim-box/confrim-box.component';
import { AddContactBookComponent } from './templates/admin/pages/contact-book/add-contact-book/add-contact-book.component';
import { ListContactBookComponent } from './templates/admin/pages/contact-book/list-contact-book/list-contact-book.component';
import { DashbordComponent } from './templates/admin/pages/dashbord/dashbord.component';
import { LayoutComponent } from './templates/admin/pages/dashbord/layout/layout.component';
import { PageHeaderComponent } from './templates/admin/pages/dashbord/page-header/page-header.component';
import { AddKhataComponent } from './templates/admin/pages/khatabook/add-khata/add-khata.component';
import { AddkhataAmtComponent } from './templates/admin/pages/khatabook/addkhata-amt/addkhata-amt.component';
import { ListKhataComponent } from './templates/admin/pages/khatabook/list-khata/list-khata.component';
import { MoreHisabComponent } from './templates/admin/pages/khatabook/more-hisab/more-hisab.component';
import { SearchpipeComponent } from './templates/admin/pages/searchpipe/searchpipe.component';
import { LoaderInterceptor } from './templates/auth/service/service/LoaderInterceptor';
import { TokenInterService } from './templates/auth/token-inter.service';
import { CourseRivePageModule } from './templates/course-rive/course-rive.module';
import { MenulistComponent } from './templates/admin/pages/menulist/menulist.component';
import { ProfileComponent } from './templates/admin/pages/profile/profile.component';
import { TaxComponent } from './templates/admin/pages/tax/tax.component';
import { BillCounterComponent } from './templates/admin/pages/bill-counter/bill-counter.component';
import { AddBillCounetrComponent } from './templates/admin/pages/bill-counter/add-bill-counetr/add-bill-counetr.component';
import { CreateBillComponent } from './templates/admin/pages/bill/create-bill/create-bill.component';


@NgModule({
  declarations: [AppComponent, MenulistComponent, CategiresComponent, AddContactBookComponent, ConfrimBoxComponent, PageHeaderComponent,CreateBillComponent,
    ListContactBookComponent, AddKhataComponent, DashbordComponent, LayoutComponent, InvoiceComponent,ProfileComponent,TaxComponent,BillCounterComponent,
    AddBillCounetrComponent,
    MoreHisabComponent,
    ListKhataComponent,
    SearchpipeComponent,
    AddkhataAmtComponent,],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule, MatButtonModule, ReactiveFormsModule, CourseRivePageModule,
    MatInputModule, ReactiveFormsModule, MatToolbarModule, MatProgressSpinnerModule, CanvasJSAngularChartsModule,
    MatSnackBarModule,
    FormsModule,
    MatIconModule,
    MatSelectModule,
    MatTabsModule,
    MatChipsModule,
    MatTableModule, MatPaginatorModule,
    CommonModule,
    MatAutocompleteModule, MatDialogModule, MatMenuModule, MatSortModule, MatCardModule,
    MatSidenavModule, MatListModule, MatExpansionModule, MatRadioModule, MatCheckboxModule
  ],

  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideAnimationsAsync(), { provide: HTTP_INTERCEPTORS, useClass: TokenInterService, multi: true }, { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptor, multi: true }],
  bootstrap: [AppComponent],
})
export class AppModule {
}