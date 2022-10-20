import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder, HubConnectionState } from '@microsoft/signalr';

@Injectable({
  providedIn: 'root'
})
export class SignalRService {

  constructor() { }

  private _connection :HubConnection;
  get connection():HubConnection{
    return this._connection;
  }

  start(hubUrl:string){ //baslatılmıs bir hub vericek 
   if(!this.connection || this._connection?.state == HubConnectionState.Disconnected){
    const builder:HubConnectionBuilder = new HubConnectionBuilder();
    const hubConnection:HubConnection=builder.withUrl(hubUrl).withAutomaticReconnect().build();
    hubConnection.start()
    .then(()=> 
  
      console.log("Connection")) //baglantı basarılıysa ver
    .catch(error=>setTimeout(()=>this.start(hubUrl),2000)); //baglantı işlemi basarılı değilse 2 saniyede bir net varlıgını kontrol et basarılı olana kadar devam et 
    this._connection = hubConnection;
  }
 
  //baglantı koparas ya da baglnatı tekrar kurulmak istenirse
  this._connection.onreconnecting(connectionId=>console.log("Reconnected")); //kopa baglanti tekrar sagalnırsa yönetimi gerceklestirme
  this._connection.onreconnecting(error=>console.log("Reconnecting")); //kopan baglantınınn tekrardan saglanma sureci
  this._connection.onclose(error=>console.log("Close reconnection"));
  }

  invoke(procedureName:string,message:any,successCallBack?:(value)=>void,errrorCallBack?:
  (error) => void){ // signalr uzerinden herhangi bir client baska bir client mesaj gönderme ihtiyacı olursa (event gönderme denilebilir)
this._connection.invoke(procedureName,message)
.then(successCallBack) //başarılımı
.catch(errrorCallBack) //değilmi
  }

  on(procedureName:string,callBack:(...message:any) => void){ // ...mesage c# taki dizi tanımlamaya karsılık geliyo//serverdan gelecek olan anlık mesajları yakalamayı saglar
  this.connection.on(procedureName,callBack)
  }

}
