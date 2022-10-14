import { SocialAuthService, SocialUser } from '@abacritt/angularx-social-login';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { TokenResponse } from 'src/app/contracts/token/tokenResponse';
import { AuthService } from 'src/app/services/common/auth.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';
import { UserAuthService } from 'src/app/services/common/models/user-auth.service';
import { UserService } from 'src/app/services/common/models/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent extends BaseComponent implements OnInit {

  constructor(private userAuthService:UserAuthService,private spinner:NgxSpinnerService,private authService:AuthService,private activatedRoute:ActivatedRoute,private router:Router,private socialAuthService:SocialAuthService) {
    super(spinner)
    socialAuthService.authState.subscribe(async (user:SocialUser)=>{
     console.log(user)
     this.showSpinner(SpinnerType.BallAtom);
   await userAuthService.googleLogin(user,()=>this.hideSpinner(SpinnerType.BallAtom))
    });
   }

  ngOnInit(): void {
  }

 async login(usernameOrEmail:string,password:string){
  this.showSpinner(SpinnerType.BallAtom)
 await this.userAuthService.login(usernameOrEmail,password, () =>{
  this.authService.identityCheck();
  this.authService.identityCheck();

  this.activatedRoute.queryParams.subscribe(params=>{ //cıkıs yapıldıugında istenilen sayfaya tıklanıldıgında giriş yapıldıgı zaman o sayfaya yönlendirme
    const returnUrl: string = params["returnUrl"];
    if(returnUrl)
    this.router.navigate([returnUrl]);
  });
  this.hideSpinner(SpinnerType.BallAtom);
 });


  }
}
