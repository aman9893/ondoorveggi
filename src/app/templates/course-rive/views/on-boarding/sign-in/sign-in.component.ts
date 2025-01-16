import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { RiveSMInput } from 'ng-rive';
import { AuthService } from 'src/app/templates/auth/auth.service';
import { DataService } from 'src/app/templates/auth/service/data.service';

@Component({
  selector: 'cr-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  standalone: false,
})
export class SignInComponent implements OnInit {
screen: any = 'signin';

  loginData: any;
  updateValue: any;
  constructor(
    private myRoute: Router,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    public authService: AuthService,
    private activatedRoute : ActivatedRoute

  ) {}
  updateFlag: boolean = false;
  sginupForm!: FormGroup;
  loginForm!: FormGroup;
  loginFormFlg: boolean = true;
  registerFormFlg: boolean = false;
  editdata:any

  ngOnInit() {
    // this.editdata = this.activatedRoute.snapshot.queryParamMap.get("page");
    // console.log(this.editdata)
    // this.updateFlag =this.editdata.update;
    // console.log(this.updateFlag)
    // if(this.editdata &&this.updateFlag === true){
    //   this.updateValue =this.editdata.data;
    //  this.loginFormFlg = false;
    //  this.registerFormFlg = true;
    // }

    this.createForm();
    this.loginFormData();
  }
  change(event: any){
    this.screen = event;
  }
  private createForm() {
    this.sginupForm = this.formBuilder.group({
      name: new FormControl('', {
        validators: [Validators.maxLength(55)],
        updateOn: 'change',
      }),
      email: new FormControl('', {
        validators: [Validators.maxLength(55)],
        updateOn: 'change',
      }),
      password: new FormControl('', {
        validators: [Validators.maxLength(55)],
        updateOn: 'change',
      }),
      username: new FormControl(''),
      company_name: new FormControl('', {
        validators: [Validators.maxLength(55)],
        updateOn: 'change',
      }),
      shop_address: new FormControl('', {
        validators: [Validators.maxLength(55)],
        updateOn: 'change',
      }),
      phone_number: new FormControl('', {
        validators: [Validators.maxLength(55)],
        updateOn: 'change',
      }),
      gst: new FormControl(''),
      company_logo: new FormControl(''),
    });
    if(this.updateFlag === true){
      this.sginupForm.controls['name'].setValue(this.updateValue.name);
      this.sginupForm.controls['email'].setValue(this.updateValue.email);
      this.sginupForm.controls['password'].setValue(this.updateValue.password);
      this.sginupForm.controls['company_name'].setValue(this.updateValue.company_name);
      this.sginupForm.controls['phone_number'].setValue(this.updateValue.phone_number);
      this.sginupForm.controls['shop_address'].setValue(this.updateValue.shop_address);
      this.sginupForm.controls['gst'].setValue(this.updateValue.gst);
      this.sginupForm.controls['company_logo'].setValue(this.updateValue.company_logo);
      this.sginupForm.controls['username'].setValue(this.updateValue.username);
    }
  }

  private loginFormData() {
    this.loginForm = this.formBuilder.group({
      emailid: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change',
      }),
      password: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change',
      }),
    });

  }

  openSnackBar(message: string, action: string) {
   
  }

  login(event: any) {
    if (event === 'login') {
      this.loginFormFlg = true;
      this.registerFormFlg = false;
      this.loginFormData();
    } else {
      this.registerFormFlg = true;
      this.loginFormFlg = false;
      this.createForm();
    }
  }

  cancel(): void {
    this.sginupForm.reset();
  }
  ErrorMessage(value: any) {
    return 'Please Enter ' + value;
  }
  Update(){

  }

  onSubmit() {
    let userData = {
      name: this.sginupForm['controls']['name'].value,
      email: this.sginupForm['controls']['email'].value,
      password: this.sginupForm['controls']['password'].value,
      company_name: this.sginupForm['controls']['company_name'].value,
      phone_number: this.sginupForm['controls']['phone_number'].value,
      shop_address: this.sginupForm['controls']['shop_address'].value,
      company_logo: '',
      username: '',
      gst_num: '',
      user_expiry_date: new Date(),
      trial_days: 14,
      rolename_id: 1,
    };
    this.dataService.registerData(userData).subscribe(
      (data: any) => this.closeDialog(data),
      (err: any) => console.log(err)
    );
    this.sginupForm.reset();
  }

  closeDialog(data: any) {
    if (data.status === true) {
      this.loginFormFlg = true;
      this.registerFormFlg = false;
      this.openSnackBar(data.message, 'Dismiss');
    }
    if (data.status === false) {
      this.openSnackBar(data.message, 'Dismiss');
    }
  }
  onLogin() {
    let userData = {
      email: this.loginForm['controls']['emailid'].value,
      password: this.loginForm['controls']['password'].value,
      dervice_token:'1'
    };
    console.log(userData);
    if (this.loginForm.valid) {
      this.dataService.loginData(userData).subscribe(
        (data: any) => this.closeLoginDialog(data),
        (err: any) => console.log(err)
      );
    }
  }
  isToastOpen = false;
  closeLoginDialog(data: any) {
    console.log(data)
    if (data.message === 'successfully') {
      console.log(data)
      this.loginData =data.payload;
      this.openSnackBar(data.message, 'Dismiss');
      this.authService.sendToken( this.loginData.auth_token);
      this.authService.setuserData( this.loginData.user_id);
      this.authService.setuserInfo( this.loginData);
      this.setOpen(true);
      
    }
    if (data.status === false) {
      this.setOpen(true);
    }
  }
  setOpen(isOpen: boolean) {
    this.isToastOpen = isOpen;
    if(true){
      setTimeout(() => {
      this.myRoute.navigateByUrl('/');

      }, 2000);
    }
  }
}
