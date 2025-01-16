import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: false,
})
export class LoginComponent  implements OnInit {
formData!: FormGroup<any>;

screen: any = 'signin';
isLoading: boolean = false;
constructor(private fb:FormBuilder, private auth:DataService) {
  this.formData = this.fb.group({
    name: ['',[Validators.required]],
    email: ['',[Validators.required, Validators.email]],
    password: ['',[Validators.required]],
  });
}

ngOnInit() {}

change(event: any){
  this.screen = event;
}

login(){
  var formData: any = new FormData();
  if(this.formData.valid){
    this.isLoading = true
    formData.append('email', this.formData.get('email')!.value);
    formData.append('password', this.formData.get('password')!.value);
    console.log(this.formData)
    this.auth.userLogin(formData).subscribe((data:any)=>{
      console.log(data);
    });
  }  
}

register(){
  var formData: any = new FormData();
  if(this.formData.valid){
    this.isLoading = true
    formData.append('name', this.formData.get('name')!.value);
    formData.append('email', this.formData.get('email')!.value);
    formData.append('password', this.formData.get('password')!.value);
    console.log(this.formData)
    this.auth.userRegister(formData).subscribe((data:any)=>{
      console.log(data);
    });
  }  
}

}
