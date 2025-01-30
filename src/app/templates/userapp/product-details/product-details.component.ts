import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products/products.service';
import { DataService } from '../../auth/service/data.service';
import {Location} from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss'],
  standalone:false
})
export class ProductDetailsComponent  implements OnInit {
 productDetailsList: any;


  constructor(
    public productService: ProductsService,private _location: Location,
    private dataService: DataService,private _route : ActivatedRoute
  ) {
   
  }
  ngOnInit(): void {
    this._route.paramMap.subscribe((params)=>{
      let id = params.get('id');
      console.log(id)
      if(id){
       this.getProductDetailsApiCall(id);
      }
      });

  }
  getProductDetailsApiCall(id:any): void {
    this.dataService.getuseroductDetials(id).subscribe((data) => this.getProductData(data),
      (err: Error) => this.errorcall(err));
  }
  errorcall(err: Error): void {
    throw new Error('Method not implemented.');
  }
  getProductData(data: any) {
    this.productDetailsList = data;
  }
  backClicked() {
    this._location.back();
  }
}
