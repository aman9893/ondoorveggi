import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  API_URL = '';
  constructor(private http:HttpClient) {}

  userLogin(req: any){
    return this.http.post(`${this.API_URL}login`,req);
  }

  userRegister(req: any){
    return this.http.post(`${this.API_URL}register`,req);
  }

}
