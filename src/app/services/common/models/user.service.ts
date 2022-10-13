
import { SocialUser } from '@abacritt/angularx-social-login';
import { Injectable } from '@angular/core';
import { firstValueFrom, Observable } from 'rxjs';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { CreateUser } from 'src/app/contracts/users/createuser';
import { User } from 'src/app/entities/user';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private httpClientService:HttpClientService,private toastrService:CustomToastrService) { }
  async create(user:User):Promise<CreateUser>{
    const observable:Observable<CreateUser|User>=this.httpClientService.post<CreateUser|User>({
      controller:"users",
      action:"createuser"
    },user);

    return await firstValueFrom(observable) as CreateUser;
  }

  async login(usernameOrEmail:string,password:string,callBackFunction?:()=>void):Promise<any>{
    const observable:Observable<any|TokenResponse>=this.httpClientService.post<any|TokenResponse>({
      controller:"users",
      action:"login"
    },{usernameOrEmail,password})
    const tokenResponse:TokenResponse= await firstValueFrom(observable) as TokenResponse;
    if(tokenResponse)
    {
      localStorage.setItem("token",tokenResponse.token.token);
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
    controller:"users",
    action:"GoogleLogin",
  },user);

const tokenResponse= await firstValueFrom(observable) as TokenResponse;
if(tokenResponse){
localStorage.setItem("token",tokenResponse.token.token);//*?
this.toastrService.message("Google üzerinden giriş başarıyla saglanmıstır","Giriş Başarılı",{
 position:ToastrPosition.TopRigth,
  messageType:ToastrMessageType.Success,
});
}
callBackFunction();
}
}



