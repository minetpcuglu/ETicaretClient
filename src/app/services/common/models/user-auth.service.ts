import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserAuthService {

  constructor(private httpClientService:HttpClientService,private toastrService:CustomToastrService) { }

  
  async login(usernameOrEmail:string,password:string,callBackFunction?:()=>void):Promise<any>{
    const observable:Observable<any|TokenResponse>=this.httpClientService.post<any|TokenResponse>({
      controller:"auth",
      action:"login"
    },{usernameOrEmail,password})
    const tokenResponse:TokenResponse= await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse)
    {
      localStorage.setItem("token",tokenResponse.token.token);
      localStorage.setItem("refreshToken",tokenResponse.token.refreshToken); //refresh token barındırma icin
      // localStorage.setItem("expiration",accesstoken.expiration.toString());
      this.toastrService.message("Kullanıcı girişi başarılı","giriş başarılı",{
        position:ToastrPosition.TopRigth,
        messageType:ToastrMessageType.Success
      });
    }
   
    callBackFunction();
  }
async googleLogin(user:SocialUser,callBackFunction? :() => void):Promise<any>{
 const observable:Observable<SocialUser | TokenResponse>=this.httpClientService.post<SocialUser | TokenResponse>({
    controller:"auth",
    action:"GoogleLogin",
  },user);

const tokenResponse= await firstValueFrom(observable) as TokenResponse;
if(tokenResponse){
localStorage.setItem("token",tokenResponse.token.token);//*?
localStorage.setItem("refreshToken",tokenResponse.token.refreshToken); //refresh token barındırma icin
this.toastrService.message("Google üzerinden giriş başarıyla saglanmıstır","Giriş Başarılı",{
 position:ToastrPosition.TopRigth,
  messageType:ToastrMessageType.Success,
});
}
callBackFunction();
}

async refreshTokenLogin(refreshToken:string,callBackFunction? :() => void): Promise<any>{
const observable :Observable<any |TokenResponse> =this.httpClientService.post({
  action:"refreshToken",
  controller:"auth"
},{refreshToken:refreshToken});
const tokenResponse: TokenResponse = await firstValueFrom(observable) as TokenResponse;
if(tokenResponse){
  localStorage.setItem("token",tokenResponse.token.token);
  localStorage.setItem("refreshToken",tokenResponse.token.refreshToken); //refresh token barındırma icin
  // localStorage.setItem("expiration",accesstoken.expiration.toString());
}
callBackFunction();
}
}
