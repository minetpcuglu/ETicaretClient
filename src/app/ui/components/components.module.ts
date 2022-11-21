import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsModule } from './products/products.module';
import { HomeModule } from './home/home.module';
import { BasketsModule } from './baskets/baskets.module';
import { RegisterComponent } from './register/register.component';
import { RegisterModule } from './register/register.module';
import { LoginModule } from './login/login.module';
import { BasketsComponent } from './baskets/baskets.component';




@NgModule({
  declarations: [
  
  ],
  imports: [
    CommonModule,
    ProductsModule,
    HomeModule,
    BasketsModule,
    RegisterModule,
    // LoginModule /login component direk ana module aldık google otuurum acma için
  ],
  exports:[
    BasketsModule
  ]
})
export class ComponentsModule { }
