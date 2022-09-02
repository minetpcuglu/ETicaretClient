import { Injectable } from '@angular/core';
import { CreateProduct } from 'src/app/contracts/createproduct';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService:HttpClientService) { }

  create(product:CreateProduct,successCallBack?:any){
    this.httpClientService.post({
      controller:"products",
      action:"addproduct"
    },product).subscribe(result=>{
     successCallBack();//create component spinner buraya tasımak için 
  
    });

  }
}
