import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { NgxSpinnerService } from 'ngx-spinner';
import { Observable } from 'rxjs';
import { SpinnerType } from 'src/app/base/base.component';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor( private jwtHelper:JwtHelperService,private router:Router,private toastrService:CustomToastrService,private spinner:NgxSpinnerService) {

  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot) {
      this.spinner.show(SpinnerType.BallAtom);
      const token :string= localStorage.getItem("token");
    // const decodeToken= this.jwtHelper.decodeToken(token);
    //const expirationDate= this.jwtHelper.getTokenExpirationDate(token);
    //const expired:boolean= this.jwtHelper.isTokenExpired(token);
    let expired:boolean;
    try {
    expired = this.jwtHelper.isTokenExpired(token);
    }
    catch{
      expired=true;
    }
    if(!token || expired)//token yoksa veya expired edilmişsse
    {
    this.router.navigate(["login"],{queryParams:{returnUrl:state.url}}) //logine gönder
    this.toastrService.message("Lütfen Oturum Acınız","Yetkisiz Erisim",{
      messageType:ToastrMessageType.Warning,
      position:ToastrPosition.TopRigth
    })
    }

    this.spinner.hide(SpinnerType.BallAtom)
    return true;
  }
  
}
