import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private jwtHelper:JwtHelperService) { }
  identityCheck(){
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
    _isAuthenticated=token != null && !expired //token null degilse expired olmamıssa
  }
  get isAuthenticated():boolean{  //authenticate olunmusmu ?
    return _isAuthenticated;
  }
}
export let _isAuthenticated:boolean;
