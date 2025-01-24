import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../services/products/products.service';
import { CartService } from '../services/cart/cart.service';
import { DataService } from '../../auth/service/data.service';
import {ActivatedRoute} from '@angular/router';
@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone:false
})
export class Tab3Page implements OnInit{
  productDetailsList: any;


  constructor(
    public productService: ProductsService,
    public cart: CartService,
    private dataService: DataService,private _route : ActivatedRoute
  ) {
   
  }
  ngOnInit(): void {
    this._route.paramMap.subscribe((params)=>{
      let id = params.get('id');
       this.getProductDetailsApiCall(id);
 
      });

  }
  getProductDetailsApiCall(id:any): void {
    this.dataService.getMenuproductDetials(id).subscribe((data) => this.getProductData(data),
      (err: Error) => this.errorcall(err));
  }
  errorcall(err: Error): void {
    throw new Error('Method not implemented.');
  }
  getProductData(data: any) {
    this.productDetailsList = data.payload;
    console.log('this.productList :>> ', this.productDetailsList);
  }
}
