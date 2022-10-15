import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { async, catchError, Observable, of } from 'rxjs';
import { PositionType } from '../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';
import { UserAuthService } from './models/user-auth.service';

@Injectable({
  providedIn: 'root'
})
 //handler delegate yani temsil edicilere denir
    //yani yapılacak istekle ilgili surecte araya girmemizi belirli manipulasyonları gerceleştirme  
    //interceptor bir istek var ıstek yapılan esnada iradeli bir sekilde araya girilip bu istekle ilgli yapılması gerkenleri gerceklestirdikten sonra devam edilmesi isteniyorsa bu araya girilmesini saglayan yapılanmamıza http interceptor deniliyor
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService : CustomToastrService,private userAuthService:UserAuthService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {


   return next.handle(req).pipe(catchError ( error=>{
   switch (error.status)
   {
    case HttpStatusCode.Unauthorized:
this.toastrService.message("Yetkisiz Erişim Algıalndı","Yetkisiz Erişim",{
  messageType:ToastrMessageType.Warning,
  position:ToastrPosition.TopRigth
});
//refresh token varsa onunla devam et 
 this.userAuthService.refreshTokenLogin(localStorage.getItem("refreshToken")).then(data =>{

 }); //await yazmadıgımz ıcın then ile gönderilmesi saglandı
      break;
    case HttpStatusCode.BadRequest:
      this.toastrService.message("Gecersiz İstek","Geçersiz İstek",{
        messageType:ToastrMessageType.Warning,
        position:ToastrPosition.TopRigth
      })
      break;
    case HttpStatusCode.InternalServerError:
      this.toastrService.message("Sunucu Erişim Saglanmadı","Sunucu Erişim Hatası",{
        messageType:ToastrMessageType.Warning,
        position:ToastrPosition.TopRigth
      })
       break;
      case HttpStatusCode.NotFound:
      this.toastrService.message("Sayfa Bulunamadı","Gecersiz Sayfa",{
        messageType:ToastrMessageType.Warning,
        position:ToastrPosition.TopRigth
      })
      break;
      default:
        this.toastrService.message("Beklenmeyen hata meydana geldi lütfen log sayfasına bakın","Hata",{
          messageType:ToastrMessageType.Error,
          position:ToastrPosition.TopRigth
        })
        break;
   }
     return of(error);//hata handler edildi
   })); //yapılan istekte bir hata varsa hatayı yakala 
  }
}
