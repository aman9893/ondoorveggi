import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';


import { AuthService } from 'src/app/templates/auth/auth.service';
import { DataService } from 'src/app/templates/auth/service/data.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  standalone:false
})
export class ProfileComponent implements OnInit {
  UserId: any;
  userData: any;

  constructor(public authService:AuthService, public dialog: MatDialog,public route:Router,
    public dataService :DataService ) { }

  ngOnInit(): void {
    this.UserId = this.authService.getUserId();
    this.getResgiterDataById();
  }

  getResgiterDataById() {
    this.dataService.getAdminProfileDataById(this.UserId)
      .subscribe(
        data => this.getRegisterData(data),
      )
  }

  getRegisterData(data:any) {
     this.userData = data[0];
  }


  updateProfile() {
    // let dialogRef = this.dialog.open(UpdateComponent, {
    //   width: '400px',
    //   height: '570px',
    //   data: this.userData,
    // });
    // dialogRef.afterClosed().subscribe((result) => {
    //   window.location.reload();
    //   this.getResgiterDataById();
    // });
   }
}
