import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class CustomToastrService {

  constructor(private toastrService:ToastrService) { }
  message(message:string,title:string,toastrOptions : Partial<ToastrOptions>){
    this.toastrService[toastrOptions.messageType](message,title,{
positionClass:toastrOptions.position
    });
  }
}
//parametrik hale getirme
export class ToastrOptions{
  messageType:ToastrMessageType;
  position:ToastrPosition;
}

export enum  ToastrMessageType{
Success="success",
Info="info",
Warning="warning",
Error="error"
}

export enum ToastrPosition{
  TopCenter="toast-top-center",
  BottomCenter="toast-bottom-center",
  TopRigth="toast-top-rigth",
  TopFullWidth="toast-top-full-width",
  BottomFullWidth="toast-bottom-full-width",
  TopLeft="toast-top-left",
  BottomRigth="toast-bottom-rigth",
  BottomLeft="toast-bottom-left"
}