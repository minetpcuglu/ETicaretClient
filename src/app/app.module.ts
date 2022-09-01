import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ToastrModule } from 'ngx-toastr';
import { AdminModule } from './admin/admin.module';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UiModule } from './ui/ui.module';


@NgModule({
  declarations: [
    AppComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AdminModule,
    UiModule,
    NgxSpinnerModule,
    BrowserAnimationsModule,// required animations module
    ToastrModule.forRoot(), // ToastrModule added
    HttpClientModule
  ],
  //base url merkezi kısımda tutma
  providers: [
    {provide:"baseUrl",useValue:"https://localhost:44311/api",multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
