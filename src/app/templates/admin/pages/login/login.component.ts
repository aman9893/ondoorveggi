import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators,FormBuilder} from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/templates/auth/auth.service';
import { DataService } from 'src/app/templates/auth/service/data.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone:false
})
export class LoginComponent implements OnInit {
  loginData: any;
  updateValue: any;
  submitted: boolean =false;
  submittedlogin: boolean =false;
  constructor(
    private snackBar: MatSnackBar,
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
    this.authService.logout();

    this.createForm();
    this.loginFormData();
  }

  private createForm() {
    this.sginupForm = this.formBuilder.group({
      name: new FormControl('', {
        validators: [Validators.required,Validators.maxLength(55)],
        updateOn: 'change',
      }),
      email: new FormControl('', {
        validators: [Validators.required,Validators.maxLength(55),Validators.email],
        updateOn: 'change',
      }),
      password: new FormControl('', {
        validators: [Validators.required,Validators.maxLength(55)],
        updateOn: 'change',
      }),
      phone_number: new FormControl('', {
        validators: [Validators.required,Validators.maxLength(55)],
        updateOn: 'change',
      }),
   
    });
    if(this.updateFlag === true){
      this.sginupForm.controls['name'].setValue(this.updateValue.name);
      this.sginupForm.controls['email'].setValue(this.updateValue.email);
      this.sginupForm.controls['password'].setValue(this.updateValue.password);
      this.sginupForm.controls['phone_number'].setValue(this.updateValue.phone_number);
  
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
    this.snackBar.open(message, action, {
      duration: 3000,
      panelClass: ['app-bottom-snackbar'],
    });
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
    if (this.sginupForm.valid) {
    let userData = {
      username: this.sginupForm['controls']['name'].value,
      email: this.sginupForm['controls']['email'].value,
      password: this.sginupForm['controls']['password'].value,
      mobile: this.sginupForm['controls']['phone_number'].value,
      dervice_token :'',
    };
    this.dataService.registerData(userData).subscribe(
      (data: any) => this.closeDialog(data),
    );
    }
    else{
      this.submitted = true;
      this.openSnackBar('* Please Enter Required Feilds', 'Dismiss');
    }
  }

  closeDialog(data: any) {
      this.loginFormFlg = true;
      this.sginupForm.reset();
      this.registerFormFlg = false;
      this.openSnackBar(data.message, 'Dismiss');
  }
  onLogin() {
    let userData = {
      email: this.loginForm['controls']['emailid'].value,
      password: this.loginForm['controls']['password'].value,
      dervice_token:''
    };
    if (this.loginForm.valid) {
      this.dataService.loginData(userData).subscribe(
        (data) => this.closeLoginDialog(data),
        (err) => this.openSnackBar(err.message, 'Dismiss')
      );
    }
    else{
      this.submittedlogin = true;
      this.openSnackBar('* Please Enter Email Id/Mobile Number & Password', 'Dismiss');
    }
  }

  closeLoginDialog(data: any) {
    if (data.status == 1 ) {
      this.loginData =data.payload;
      this.openSnackBar(data.message, 'Dismiss');
      this.authService.sendToken( this.loginData.auth_token);
      this.authService.setuserData( this.loginData.user_id);
      this.myRoute.navigateByUrl('/home');
      this.loginForm.reset();

    }
    if (data.status == 0) {
      this.openSnackBar(data.message, 'Dismiss');
    }
  }
}
