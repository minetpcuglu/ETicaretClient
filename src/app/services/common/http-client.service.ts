import { Inject, Injectable } from '@angular/core';
import{HttpClient, HttpHeaders} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class HttpClientService {
//api cagrılması
  constructor(private httpClient:HttpClient,@Inject("baseUrl") private baseUrl:string) { }

  private url(requestParameters :Partial<RequestParameters>):string{ //uygulamanın bütün istek süreclerinde kullanılan url yapılanması
   return `${requestParameters.baseUrl ?requestParameters.baseUrl : this.baseUrl}/${requestParameters.controller}${requestParameters.action ? `/${requestParameters.action}`: ""}`;
  }

  get<T>(requestParameters :Partial<RequestParameters> , id?:string):Observable<T>{
   let url:string ="";
   if(requestParameters.fullEndPoint)
   url = requestParameters.fullEndPoint;
   else 
   url=`${this.url(requestParameters)}${id ? `/${id}` : "" }`;
  return this.httpClient.get<T>(url,{headers:requestParameters.headers});
  }
}

export class RequestParameters{
  controller?:string;
  action?:string;
  headers?:HttpHeaders;
  baseUrl?:string;
  fullEndPoint?:string;
}
