import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { DataService } from '../../auth/service/data.service';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss'],
  standalone:false
})
export class UserprofileComponent  implements OnInit {
  profileForm!: FormGroup;
  UserId: any;
  userData: any;
  updateFlag: boolean =false;
  updateValue: any;
  submitted: boolean =false;

  constructor(public authService:AuthService,public route:Router,
    public dataService :DataService, private formBuilder: FormBuilder,
     ) { }

  ngOnInit(): void {
    this.UserId = this.authService.getUserId();
    this.getUserProfile();
  }
  dismissModal(data: any) {
    this.route.navigateByUrl('/home')
  }
    private createForm() {
      this.profileForm = this.formBuilder.group({
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
          validators: [Validators.required,Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$")],
          updateOn: 'change',
        }),
     
      });
      if(this.updateFlag === true){
        this.profileForm.controls['name'].setValue(this.updateValue.username);
        this.profileForm.controls['email'].setValue(this.updateValue.email);
        this.profileForm.controls['password'].setValue(this.updateValue.password);
        this.profileForm.controls['phone_number'].setValue(this.updateValue.mobile);
      }
    }

  getUserProfile() {
    this.dataService.getUserProfileDataById(this.UserId)
      .subscribe(
        data => this.getUserProfileRes(data),
      )
  }

  getUserProfileRes(data:any) {
    console.log(data)
    if (data.status == 1 ) {
     this.userData = data.payload[0];
     console.log(data)
     this.updateValue= this.userData;
     this.updateFlag =true;
     if(this.updateFlag){
      this.createForm();
     }
    }
  }
  onUpdasteSubmit() {
    if (this.profileForm.valid) {
    let userData = {
      name: this.profileForm['controls']['name'].value,
      username: this.profileForm['controls']['name'].value,
      email: this.profileForm['controls']['email'].value,
      password: this.profileForm['controls']['password'].value,
      mobile: this.profileForm['controls']['phone_number'].value,
      dervice_token :'',
      mobile_code:'mobile'
    };
    this.dataService.updateUserProfile(userData).subscribe(
      (data: any) => this.closeDialog(data),
    );
    }
    else{
      this.submitted = true;
      this.dataService.openSnackBar(' Please Enter Required Feilds', 'Dismiss');
    }
  }
  closeDialog(data: any) {
    this.dataService.openSnackBar('Your profile is successfully updated', 'Dismiss');
    this.getUserProfile();
}

}
