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
       url=`${this.url(requestParameters)}${id ? `/${id}` : "" }${requestParameters.queryString ? `?${requestParameters.queryString}` :"" }`;
  return this.httpClient.get<T>(url,{headers:requestParameters.headers}); //url varsa query eklenir yoksa bos gecer
  debugger;
}

  post<T>(requestParameters :Partial<RequestParameters>,body:Partial<T>):Observable<T>{
    let url: string = "";
    if(requestParameters.fullEndPoint)
        url = requestParameters.fullEndPoint;
    else
        url=`${this.url(requestParameters)}${requestParameters.queryString ? `?${requestParameters.queryString}` :"" }`;
   return this.httpClient.post<T>(url,body,{headers:requestParameters.headers});
  }

  put<T>(requestParameters :Partial<RequestParameters>,body:Partial<T>):Observable<T>{
    let url: string = "";
    if(requestParameters.fullEndPoint)
       url = requestParameters.fullEndPoint;
    else
       url=`${this.url(requestParameters)}${requestParameters.queryString ? `?${requestParameters.queryString}` :"" }`;
    return this.httpClient.put<T>(url,body,{headers:requestParameters.headers});
  }

  delete<T>(requestParameter: Partial<RequestParameters>, id: string):Observable<T> {
    let url: string = "";
  if (requestParameter.fullEndPoint)
    url = requestParameter.fullEndPoint;
  else
    url = `${this.url(requestParameter)}/${id}${requestParameter.queryString ? `?${requestParameter.queryString}` : ""}`;

  return this.httpClient.delete<T>(url, { headers: requestParameter.headers });
  }
}

export class RequestParameters{
  controller?: string;
  action?: string;
  queryString?: string;
  
  headers?: HttpHeaders;
  baseUrl?: string;
  fullEndPoint?: string;
}




