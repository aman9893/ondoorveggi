import { Component, OnInit ,AfterViewInit, ViewChild, ChangeDetectorRef} from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/templates/auth/service/data.service';
import { AuthService } from 'src/app/templates/auth/auth.service';
import { ConfrimBoxComponent } from '../confrim-box/confrim-box.component';
import { IonModal } from '@ionic/angular';

@Component({
  selector: 'app-menulist',
  templateUrl: './menulist.component.html',
  styleUrls: ['./menulist.component.scss'],
  standalone:false
})
export class MenulistComponent implements OnInit  {
  billData: any;
  update_data: any;
  updatebtn: boolean = false;
  productForm!: FormGroup;
  isModalOpen = false;

  @ViewChild(IonModal) modal!: IonModal;
 public displayedColumns:any = ['menu_name', 'menu_price' ,'menu_categories','menu_id' ];
 public dataSource :any;

  @ViewChild(MatSort) sort = {} as MatSort;
  @ViewChild(MatPaginator) paginator = {} as MatPaginator;
  categoryDataList: any;
  submitted: boolean=false;
  productid: any;

  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    public dialog: MatDialog,
    public snackBar: MatSnackBar,private cdref: ChangeDetectorRef,
  ) {}
  
  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  ngOnInit() {
    this.createForm();
    this.getcategoryData();
    this.getProductApiCall()
  }
  cancel() {
    this.modal.dismiss(null, 'cancel');
  }

  getProductApiCall(): void {
    this.dataService.getMenuInfo().subscribe((data) => this.getProductData(data),
    (err: Error) => this.errorcall(err));
  }
  getProductData(data: any) { 
    this.billData= data.payload;
    if( this.billData){
    this.dataSource =new MatTableDataSource(this.billData);
    this.setDataSourceAttributes();
    }
  }
 
  errorcall(errorcall:any){
    this.dataService.openSnackBar(errorcall.message,'Dismiss');
 }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }
  setDataSourceAttributes() {
    if (this.paginator !== undefined && this.sort != undefined) {
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    }
  }
 
  getcategoryData(): void {
    this.dataService.getcategoryList().subscribe((data) => this.categoryData(data));
  }
  categoryData(data: any) {
    this.categoryDataList = data.payload;
  }

  setOpen(isOpen: boolean) {
    this.isModalOpen = isOpen;
  }

  setEditOpen(isOpen: boolean,element:any) {
    this.isModalOpen = isOpen;
    this.edit(element);
  }

  createForm() {
    this.productForm = this.formBuilder.group({
      menu_name: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        // updateOn: 'blur',
      }),
      menu_price: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        // updateOn: 'blur',
      }),
      menu_url: new FormControl('', {
        // validators: [Validators.required, Validators.maxLength(500)],
        // updateOn: 'blur',
      }),
      unit_name: new FormControl('', {
        // validators: [Validators.required, Validators.maxLength(500)],
        // updateOn: 'blur',
      }),
      unit_value: new FormControl('', {
        // validators: [Validators.required, Validators.maxLength(500)],
        // updateOn: 'blur',
      }),
      status: new FormControl(true, {
        // validators: [Validators.required, Validators.maxLength(500)],
        // updateOn: 'blur',
      }),
      detail: new FormControl('', {
        // validators: [Validators.required, Validators.maxLength(500)],
        // updateOn: 'blur',
      }),
      menu_categories: new FormControl('', {
        // validators: [Validators.required, Validators.maxLength(500)],
        // updateOn: 'blur',
      }),
    
    });
  }



  //---------------------------------------------add file end -------------------------------------
  onSubmit() {
    if (this.productForm.invalid) {
      this.submitted = true;
      this.dataService.openSnackBar('* Item Name  And Item Price is mandatory ', 'Dismiss')
      return;
  }
    if (this.productForm.valid) {
      this.submitted = false;
      let productdata = {
        brand_id:1,
        cat_id: this.productForm.controls['menu_categories'].value,
        type_id:1,
        name: this.productForm.controls['menu_name'].value,
        unit_name:this.productForm.controls['unit_name'].value,
        unit_value:this.productForm.controls['unit_value'].value,
        nutrition_weight:this.productForm.controls['menu_url'].value,
        status:this.productForm.controls['status'].value,
        price: this.productForm.controls['menu_price'].value,
        detail:this.productForm.controls['detail'].value,
      };
      this.dataService.saveMenu(productdata).subscribe(
        (data: any) => this.closeDialog(data),
        (err: any) => console.log(err)
      );
    }
  }

  closeDialog(data: any) {
    this.dataService.openSnackBar(data.message, 'Dismiss');
    this.isModalOpen = false;
    this.getProductApiCall();
    this.createForm();
    this.productForm.reset();
  }

  edit(data: any){
    this.updatebtn =true;
    this.productid=data.prod_id
    this.productForm.controls['menu_name'].setValue(data.name);
    this.productForm.controls['menu_price'].setValue(data.price);
    this.productForm.controls['menu_url'].setValue(data.nutrition_weight);
    this.productForm.controls['menu_categories'].setValue(data.cat_id);
    this.productForm.controls['detail'].setValue(data.detail);
    this.productForm.controls['unit_value'].setValue(data.unit_value);
    this.productForm.controls['unit_name'].setValue(data.unit_name);
  }

  update() {
    if (this.productForm.invalid) {
      this.submitted = true;
      this.dataService.openSnackBar('* Item Name  And Item Price is mandatory ', 'Dismiss')
      return;
  }
    let product = {
        prod_id:   this.productid,
        brand_id:1,
        cat_id: this.productForm.controls['menu_categories'].value,
        type_id:1,
        name: this.productForm.controls['menu_name'].value,
        unit_name:this.productForm.controls['unit_name'].value,
        unit_value:this.productForm.controls['unit_value'].value,
        nutrition_weight:this.productForm.controls['menu_url'].value,
        status:this.productForm.controls['status'].value,
        price: this.productForm.controls['menu_price'].value,
        detail:this.productForm.controls['detail'].value,
    };
    this.dataService.updateMenu(product).subscribe(
      (data: any) => this.updateDialog(data),
      (err: any) => console.log(err)
    );
  }
  updateDialog(data:any){
    this.dataService.openSnackBar(data.message, 'Dismiss')
    if (data.status == 1) {
      this.updatebtn = false;
      this.isModalOpen = false;
      this.productForm.reset();
      this.getProductApiCall()
      this.createForm();
      this.setDataSourceAttributes();
    }
  }
  delete(id: any) {
    this.dataService
      .deleteMenu(id)
      .subscribe((data) => this.deleteResponse(data));
  }
  deleteResponse(data: any) {
      this.dataService.openSnackBar(data.message, 'Dismiss')
      if(data.status ==1){
      this.isModalOpen = false;
        this.getProductApiCall()
      }
  }

  deleteValue(id:any) {
    let deletedata = {
      flag:'delete',
      body: 'Want to delete Product? '
    };
    const dialogRef = this.dialog.open(ConfrimBoxComponent, {
      width: '300px',
      autoFocus: false,
      data: deletedata,
    });
  
    dialogRef.afterClosed().subscribe((result:any) => {
      if(result === 'yes'){
        this.delete(id)
      }
    });
  }
}
