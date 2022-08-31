import { Injectable } from '@angular/core';

declare var alertify:any; //kullanmak için declare ediliyor

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }
  // message(message:string,messageType:MessageType,positionType:PositionType,delay:number=4,dismissOthers:boolean=false)
  message(message:string,options:Partial<AlertifyOptions>){  //obseyi diger .ts lerde kulanmak ıcın
    alertify.set('notifier','delay',options.delay);
    alertify.set('notifier','position',options.positionType);
  const msj= alertify[options.messageType](message);
   if(options.dismissOthers){
msj.dismissOthers();
   }
  }

  dismiss(){
    alertify.dismissAll();
  }


}

//ts config scrict : false typescript hatası
export class AlertifyOptions{
messageType:MessageType=MessageType.Message;
positionType:PositionType=PositionType.BottomLeft;
delay:number=3;
dismissOthers:boolean=false;
}

export enum MessageType{
  Error="error",
  Message="message",
  Notify="notify",
  Warning="warning",
  Success="success"
}

export enum PositionType{
  TopCenter="top-center",
  BottomCenter="bottom-center",
  TopRigth="top-rigth",
  TopLeft="top-left",
  BottomRigth="bottom-rigth",
  BottomLeft="bottom-left"
}
