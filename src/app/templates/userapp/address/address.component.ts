import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { DataService } from '../../auth/service/data.service';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  standalone:false
})
export class AddressComponent  implements OnInit {

 addressForm!: FormGroup;
   UserId: any;
   userData: any;
   updateFlag: boolean =false;
   updateValue: any;
   submitted: boolean =false;
  useraddress: any;
  location: any;
 
   constructor(public authService:AuthService,
     public dataService :DataService, private formBuilder: FormBuilder,
      ) { }
 
   ngOnInit(): void {
     this.UserId = this.authService.getUserId();
     this.getUserProfile();
   }
     private createForm() {
       this.addressForm = this.formBuilder.group({
         houseno: new FormControl('', {
           validators: [Validators.required,Validators.maxLength(55)],
           updateOn: 'change',
         }),
         building: new FormControl('', {
           validators: [Validators.required,Validators.maxLength(55)],
           updateOn: 'change',
         }),
       
         city: new FormControl('', {
           validators: [Validators.required,Validators.maxLength(55)],
           updateOn: 'change',
         }),
         state: new FormControl('', {
           validators: [Validators.required,Validators.maxLength(55)],
           updateOn: 'change',
         }),
         postal_code: new FormControl('', {
          validators: [Validators.required,Validators.maxLength(55)],
          updateOn: 'change',
        }),
        mobile: new FormControl('', {
          validators: [Validators.required,Validators.maxLength(55)],
          updateOn: 'change',
        }),
        type_name: new FormControl('', {
          validators: [],
          updateOn: 'change',
        }),
      
       });
       if(this.updateFlag === true){
         this.addressForm.controls['houseno'].setValue(this.useraddress.name);
         this.addressForm.controls['building'].setValue(this.useraddress.address);
         this.addressForm.controls['city'].setValue(this.useraddress.city);
         this.addressForm.controls['state'].setValue(this.useraddress.state);
         this.addressForm.controls['postal_code'].setValue(this.useraddress.postal_code);
         this.addressForm.controls['mobile'].setValue(this.useraddress.phone);
         this.addressForm.controls['type_name'].setValue(this.useraddress.type_name);

       }
     }
   getUserProfile() {
     this.dataService.getUserProfileDataById(this.UserId)
       .subscribe(
         data => this.getUserProfileRes(data),
       )
   }
   getUserProfileRes(data:any) {
     if (data.status == 1 ) {
      this.userData = data.payload[0];
      this.updateValue= this.userData;
      this.getUserAddress()
     }
   }

   getUserAddress() {
    this.dataService.getUserAddressId(this.UserId)
      .subscribe(
        data => this.getUseraddress(data),
      )
  }
  getUseraddress(data:any) {
    if (data.status == 1 ) {
     this.useraddress = data.payload[0];
     this.updateFlag =true;
     if(this.updateFlag){
      this.createForm();
     }
    }
  }
 
 
   addressFormSubmit() {
     if (this.addressForm.valid) {
     let userData = {
       user_id:this.UserId,
       name: this.addressForm['controls']['houseno'].value,
       address: this.addressForm['controls']['building'].value,
       city: this.addressForm['controls']['city'].value,
       state: this.addressForm['controls']['state'].value,
       postal_code: this.addressForm['controls']['postal_code'].value,
       phone:  this.addressForm['controls']['mobile'].value,
       type_name: this.addressForm['controls']['type_name'].value,
     };
     this.dataService.userAddressSave(userData).subscribe(
       (data: any) => this.closeDialog(data),
     );
     }
     else{
       this.submitted = true;
       this.dataService.openSnackBar('* Please Enter Required Feilds', 'Dismiss');
     }
   }
   closeDialog(data: any) {
     this.dataService.openSnackBar(data.message, 'Dismiss');
 }
 
 public openMapsApp() {
  //  https://www.google.com/maps/dir/17.4784512,78.3745024
  let url ='   https://www.google.com/maps/dir/17.4784512,78.3745024'

  window.location.href = url;

}

  getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            if (position) {
              console.log(
                'Latitude: ' +
                  position.coords.latitude +
                  'Longitude: ' +
                  position.coords.longitude
              );
              let lat = position.coords.latitude;
              let lng = position.coords.longitude;

              const location = {
                lat,
                lng,
              };
              this.location =location;
              resolve(location);
            }
          },
          (error) => console.log(error)
        );
      } else {
        reject('Geolocation is not supported by this browser.');
      }
    });
  }
  // onLocationSelected(location: Location) {
  //   this.latitude = location.latitude;
  //   this.longitude = location.longitude;

  //   this.form.patchValue({
  //     latitude: location.latitude,
  //     longitude: location.longitude
  //   });
  // }


}
