import { Component, OnInit, ViewChild } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { CreateProduct } from 'src/app/contracts/createproduct';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { ListComponent } from './list/list.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent extends BaseComponent{

  constructor( spinnerService:NgxSpinnerService , private httpClientService:HttpClientService) { 
    super(spinnerService);
  }

@ViewChild(ListComponent) ListComponents:ListComponent //list component oldugunu bildirme

  createdProduct(createdProduct:CreateProduct){
    this.ListComponents.getProducts(); //list componentten get product cagırma

  }

}