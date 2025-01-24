import { AfterViewInit, ChangeDetectorRef, Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { ConfrimBoxComponent } from '../confrim-box/confrim-box.component';
import { MatDialog } from '@angular/material/dialog';
import { DataService } from 'src/app/templates/auth/service/data.service';
import { AuthService } from 'src/app/templates/auth/auth.service';

@Component({
  selector: 'app-categires',
  templateUrl: './categires.component.html',
  styleUrls: ['./categires.component.scss'],
  standalone:false
})
export class CategiresComponent implements OnInit {

  user_id: any;
  categoryDataList: any;
  update_data: any;
  updatebtn: boolean = false;
  category_id: any;
  registerForm: any;
  submitted = false;
  categoryForm!: FormGroup;


  
 public displayedColumns:any = [ 'category_name','category_id',];
 public dataSource :any;

  @ViewChild(MatSort) sort = {} as MatSort;
  @ViewChild(MatPaginator) paginator = {} as MatPaginator;
  showDataLoader: boolean =true;



  constructor(
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private authService: AuthService,
    public snackBar: MatSnackBar,
    private cdref: ChangeDetectorRef,public dialog: MatDialog,
  ) {}

  @ViewChild(MatSort) set matSort(ms: MatSort) {
    this.sort = ms;
    this.setDataSourceAttributes();
  }

  @ViewChild(MatPaginator) set matPaginator(mp: MatPaginator) {
    this.paginator = mp;
    this.setDataSourceAttributes();
  }
  ngAfterViewInit() {
   
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

  ngOnInit() {
    this.getcategoryData();
    let UserId = this.authService.getUserId();
    this.user_id = UserId;
    this.createForm();
  }

  getcategoryData(): void {
    this.dataService.getcategoryList().subscribe((data) => this.categoryData(data));
  }

  categoryData(data: any) {
    if(data.status == 1){
    this.categoryDataList = data.payload;
    this.dataSource =new MatTableDataSource(this.categoryDataList);
    this.showDataLoader = false;
    this.setDataSourceAttributes();
    this.cdref.detectChanges();
    }
  }
  createForm() {
    this.categoryForm = this.formBuilder.group({
      category_name: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change',
      }),
    });
  }

  ErrorMessage() {
    return '*This is required field';
  }
  get f() { return this.registerForm.controls; }

  //---------------------------------------------add file end -------------------------------------
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.categoryForm.invalid) {
      this.dataService.openSnackBar('* Category Name is mandatory ', 'Dismiss')
        return;
    }

    if (this.categoryForm.valid) {
      let categoryFormData = {
        color: 'red',
        cat_name: this.categoryForm.controls['category_name'].value,
      };
      this.dataService.adddcategoryList(categoryFormData).subscribe(
        (data: any) => this.closeDialog(data),
      );
    }
    this.categoryForm.reset();
    this.submitted=false;
  }

  closeDialog(data: any) {
    if (data.status == 1) {
      this.dataService.openSnackBar(data.message, 'Dismiss')
      this.getcategoryData();
    }
    this.getcategoryData();
  }
  cancel(data: any) {}

  edit(data: any){
    this.updatebtn =true;
    this.categoryForm.controls['category_name'].setValue(data.cat_name);
    this.category_id= data.cat_id;
  }
  update() {
    let categoryFormData = {
      cat_id:this.category_id,
      color:'red',
      cat_name: this.categoryForm.controls['category_name'].value,
    };
    this.dataService.updateCategory(categoryFormData).subscribe(
      (data: any) => this.updateDialog(data),
    );
  }
  updateDialog(data:any){
    this.dataService.openSnackBar(data.message, 'Dismiss')

    if (data.status == 1) {
      this.category_id ='';
      this.categoryForm.reset();
      this.getcategoryData();
      this.updatebtn =false;

    }
  }
  delete(id: any) {
    this.dataService
      .deletecategoryList(id)
      .subscribe((data) => this.deleteResponse(data));
  }
  deleteResponse(data: any) {
    this.dataService.openSnackBar(data.message, 'Dismiss')
    if (data.status == 1) {
      this.getcategoryData();
      this.categoryForm.reset();
    }
  }
  deleteValue(id:any) {
    let deletedata = {
      flag:'delete',
      body: 'Want to delete This Category? '
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

