import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutModule } from './layout/layout.module';
import { ComponentsModule } from './components/components.module';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LayoutModule, //bir modul baska bir modulu kendi icinde benimsemesi gerekiyorsa onu import etmesi lazım
    ComponentsModule
  ],
  exports:[ //dısarıdan erişileblir olmasını istiyorsak export edilmeli
    LayoutModule
  ]
})
export class AdminModule { }
