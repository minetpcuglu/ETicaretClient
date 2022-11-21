import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { Create_Basket_Item } from 'src/app/contracts/basket/create_basket_item';
import { List_Basket_Item } from 'src/app/contracts/basket/list_basket_item';
import { Update_Basket_Item } from 'src/app/contracts/basket/update_basket_item';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  constructor(private httpClientService:HttpClientService) {}
  
async get():Promise<List_Basket_Item[]>{
  const observable:Observable<List_Basket_Item[]> = this.httpClientService.get({
    controller:"baskets",
    action:"GetBasketItems"
  });
 return await firstValueFrom(observable);
}

async add(product:Create_Basket_Item):Promise<void>{
const observable:Observable<any>= this.httpClientService.post({
  controller:"baskets",
  action:"AddItemToBasket"
},product);
await firstValueFrom(observable);

}

async put(basketItem:Update_Basket_Item):Promise<void>{
  const observable:Observable<any>= this.httpClientService.put({
    controller:"baskets",
    action:"UpdateQuantity"
  },basketItem);
  await firstValueFrom(observable);
  }

  //Bu sekildede olur conctract olusturmadan
  // async putbusekildedeolur(basketItemId:string,quantity:number):Promise<void>{
  //   const observable:Observable<any>= this.httpClientService.put({
  //     controller:"baskets",
  //     action:"UpdateQuantity"
  //   },{
  //     basketItemId:basketItemId,
  //     quantity:quantity
  //   });
  //   }


  async remove(basketItemId:string):Promise<void>{
    const observable:Observable<any>= this.httpClientService.delete({
      controller:"baskets",
      action:"RemoveBasketItem"
    },basketItemId);
    await firstValueFrom(observable);
    }
}
