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
export class ProductsComponent extends BaseComponent implements OnInit{

  constructor( spinnerService:NgxSpinnerService , private httpClientService:HttpClientService) { 
    super(spinnerService);
  }

  ngOnInit(): void {
    // this.showSpinner(SpinnerType.BallSpinClockwiseFadeRotating);
    // this.httpClientService.get<CreateProduct[]>({
    //   controller:"products",
    //   action:"getproducts"
    // }).subscribe(data=>console.log(data));
  }

@ViewChild(ListComponent) ListComponents:ListComponent //list component oldugunu bildirme

  createdProduct(createdProduct:CreateProduct){
    this.ListComponents.getProducts(); //list componentten get product cagırma

  }


//     this.httpClientService.post({
//      controller:"products",
//      action:"addproduct"
//     },{
// name:"Kalem",
// UnitInStock:50,
// Price:450
//     }).subscribe();

//     this.httpClientService.put({
//      controller:"products",
//      action:"updateproduct"
//     },{
//     id:"f4150830-cc4f-43be-6b26-08da8c4d7e4c",
// name:"güncelle",
// unitInStock:50,
// price:450
//     }).subscribe();


// this.httpClientService.delete({
//   controller:"products",
//   action:"deleteproduct"
// },"b9acfd5d-2275-4dbd-6b29-08da8c4d7e4c")
// .subscribe();
//   }

// this.httpClientService.get({
//   fullEndPoint:"https://jsonplaceholder.typicode.com/posts",
// }).subscribe(data=>console.log(data));
//   }
}
