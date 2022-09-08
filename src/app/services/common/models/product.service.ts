import { HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { CreateProduct } from 'src/app/contracts/createproduct';
import { ListProducts } from 'src/app/contracts/listproducts';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private httpClientService:HttpClientService) { }

  create(product:CreateProduct,successCallBack?:()=>void ,errorCallBack?: (errorMessage:string)  => void ){  //tip güvenligi için yarım kaldı
    this.httpClientService.post({
      controller:"products",
      action:"addproduct"
    },product).subscribe(result=>{
     successCallBack();//create component spinner buraya tasımak için 
    }, (errorResponse:HttpErrorResponse)=>{
     const _error:Array<{key:string,value:Array<string>}>=  errorResponse.error;
     let message="";
     _error.forEach((v,index)=>{
      v.value.forEach((_v,_index)=>{
message+=`${_v}<br>`//hata mesajlarını getiriyo
      });
     });
     errorCallBack(message);
    });
  }


  //async oldugu için promise ile geri döner //read basarılı ıse successcallback dondur 
  //sadecee pagedeki deger aralıgındaki datalar gelmesi icin 0ıncı sayfa 5 eleman
async read(page:number=0, size:number=5, successCallBack?:()=>void,errorCallBack?:(errorMessage:string)=>void):Promise<{totalCount:number,products:ListProducts[]}> {
 const promiseData:  Promise<{totalCount:number,products:ListProducts[]}> = this.httpClientService.get<{totalCount:number,products:ListProducts[]}>({
    controller:"products",
    action:"getproducts",
    queryString:`page=${page}&size=${size}`
  }).toPromise();
  //value karsılanıyorsa
  promiseData.then(d=>successCallBack()) 
  //hata varsa
  .catch((errorResponse:HttpErrorResponse)=>errorCallBack(errorResponse.message))

  return await promiseData;
}

//id ye karsılık silme işlemi
async delete(id: string) {
  const deleteObservable: Observable<any> = this.httpClientService.delete<any>({
    controller: "products",
    action:"deleteproduct"
  }, id);

  await firstValueFrom(deleteObservable);
}
  }
