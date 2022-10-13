import { GoogleLoginProvider, SocialAuthServiceConfig, SocialLoginModule } from '@abacritt/angularx-social-login';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { JwtModule } from '@auth0/angular-jwt';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { AdminModule } from './admin/admin.module';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './ui/components/login/login.component';
import { UiModule } from './ui/ui.module';







@NgModule({
  declarations: [
    AppComponent,
    LoginComponent ///login component direk ana module aldık google otuurum acma için
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,// required animations module
    ToastrModule.forRoot(), // ToastrModule added
    HttpClientModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: ()=>localStorage.getItem("token"),
        allowedDomains:["localhost:44311"]
      }
    }),
    SocialLoginModule
  ],
  //base url merkezi kısımda tutma
  providers: [
    {provide:"baseUrl",useValue:"https://localhost:44311/api",multi:true},
    {
      provide: "SocialAuthServiceConfig",
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider("40009620963-ooc4sdc587e72a13pvuurrmnd3j9p372.apps.googleusercontent.com")
          }
        ],
        onError: err => console.log(err)
      } as SocialAuthServiceConfig
    }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
