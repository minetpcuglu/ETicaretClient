import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpStatusCode } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of } from 'rxjs';
import { PositionType } from '../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class HttpErrorHandlerInterceptorService implements HttpInterceptor {

  constructor(private toastrService : CustomToastrService) { }
  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

  console.log("abc");

   return next.handle(req).pipe(catchError(error=>{
   switch (error.status)
   {
    case HttpStatusCode.Unauthorized:
this.toastrService.message("Yetkisiz Erişim Algıalndı","Yetkisiz Erişim",{
  messageType:ToastrMessageType.Warning,
  position:ToastrPosition.TopRigth
})
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
