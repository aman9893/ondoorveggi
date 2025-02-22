import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { map, Observable } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { DataService } from '../../auth/service/data.service';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  standalone: false
})
export class AddressComponent implements OnInit {

  addressForm!: FormGroup;
  UserId: any;
  userData: any;
  updateFlag: boolean = false;
  updateValue: any;
  submitted: boolean = false;
  useraddress: any;
  location: any;
  addressshowvalue = false;
  showaddrsspage = false;
  addressshowNovalue = false;

  constructor(public authService: AuthService, public route: Router, public modalController: ModalController,
    public dataService: DataService, private formBuilder: FormBuilder, private _location: Location
  ) { }

  ngOnInit(): void {
    this.UserId = this.authService.getUserId();
    this.getUserProfile();
    this.createForm();

  }
  private createForm() {
    this.addressForm = this.formBuilder.group({
      houseno: new FormControl('', {
        validators: [Validators.required, ],
        updateOn: 'change',
      }),
      roadno: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change',
      }),

      city: new FormControl('Hyderabad', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change',
      }),
      state: new FormControl('Telangana', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change',
      }),
      postal_code: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change',
      }),
      mobile: new FormControl('', {
        validators: [Validators.required, Validators.maxLength(55)],
        updateOn: 'change',
      }),
      type_name: new FormControl('home', {
        validators: [],
        updateOn: 'change',
      }),

    });
    if (this.updateFlag === true) {
      this.addressForm.controls['houseno'].setValue(this.useraddress.roadno);
      this.addressForm.controls['roadno'].setValue(this.useraddress.address);
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


  getUserProfileRes(data: any) {
    if (data.status == 1) {
      this.userData = data.payload[0];
      this.updateValue = this.userData;
      this.getUserAddressValue()
    }
  }

  getUserAddressValue() {
    this.dataService.getUserAddressId(this.UserId)
      .subscribe(
        data => this.getUseraddress(data),
      )
  }
  getUseraddress(data: any) {

    console.log('hii')
    if (data.status == 1) {
      if (data.payload && data.payload.length > 0) {
        this.updateFlag = true;
        this.useraddress = data.payload[0];
        this.addressshowvalue = true;
        this.addressshowNovalue = false;
        this.showaddrsspage = false;
      }

      else {
        this.addressshowvalue = false;
        this.addressshowNovalue = true;
        this.showaddrsspage = false;

      }
    }
  }
  showback() {
    this.getUserProfile();

  }

  isActionSheetOpen = false;
  public actionSheetButtons = [
    {
      text: 'Delete',
      role: 'destructive',
      data: {
        action: 'delete',
      },
    },

    {
      text: 'Cancel',
      role: 'cancel',
      data: {
        action: 'cancel',
      },
    },
  ];

  setOpen(isOpen: boolean, event: any) {
    this.isActionSheetOpen = isOpen;
    if (event?.detail?.data?.action == 'delete') {
      this.deleteaddress(this.useraddress.address_id)
    }
    else {

    }
  }
  deleteaddress(id: any) {
    this.getUserDeleteAdd(id);
  }

  dismissModal() {
    console.log('hii')
    if (this._location.path() == '/Addresses') {
      this.route.navigateByUrl('/home')
    }
    else {
        this.modalController.dismiss('address');
    }
  }


  getUserDeleteAdd(id: any) {
    this.dataService.deleteUserAddress(id)
      .subscribe(
        data => this.getUserDeleteaddress(data),
      )
  }
  getUserDeleteaddress(data: any) {
    console.log(data);
    if (data.status == 1) {
      this.getUserProfile();
    }
    this.dataService.openSnackBar('Dismiss', data.message)
  }


  addaddress() {
    this.showaddrsspage = true;
    this.addressshowvalue = false;
    this.addressshowNovalue = false;
    this.createForm();
  }

  addressUpdateSubmit() {
    if (this.addressForm.valid) {
      let userData = {
        address_id: this.useraddress.address_id,
        address: this.addressForm['controls']['houseno'].value,
        roadno: this.addressForm['controls']['roadno'].value,
        city: this.addressForm['controls']['city'].value,
        state: this.addressForm['controls']['state'].value,
        postal_code: this.addressForm['controls']['postal_code'].value,
        phone: this.addressForm['controls']['mobile'].value,
        type_name: this.addressForm['controls']['type_name'].value,
      };
      this.dataService.userUpdateAddressSave(userData).subscribe(
        (data: any) => this.closeDialog(data),
      );
    }
    else {
      this.submitted = true;
      this.dataService.openSnackBar('* Please Enter Required Feilds', 'Dismiss');
    }
  }

  addressFormSubmit() {
    if (this.addressForm.valid) {
      let userData = {
        user_id: this.UserId,
        address: this.addressForm['controls']['houseno'].value,
        roadno: this.addressForm['controls']['roadno'].value,
        city: this.addressForm['controls']['city'].value,
        state: this.addressForm['controls']['state'].value,
        postal_code: this.addressForm['controls']['postal_code'].value,
        phone: this.addressForm['controls']['mobile'].value,
        type_name: this.addressForm['controls']['type_name'].value,
      };
      this.dataService.userAddressSave(userData).subscribe(
        (data: any) => this.closeDialog(data),
      );
    }
    else {
      this.submitted = true;
      this.dataService.openSnackBar('* Please Enter Required Feilds', 'Dismiss');
    }
  }
  closeDialog(data: any) {
    this.dataService.openSnackBar(data.message, 'Dismiss');
    this.dataService.upadteAddress.emit(true);
    this.showback()
  }

  public openMapsApp() {
    //  https://www.google.com/maps/dir/17.4784512,78.3745024
    let url = '   https://www.google.com/maps/dir/17.4784512,78.3745024'

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
              this.location = location;
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
