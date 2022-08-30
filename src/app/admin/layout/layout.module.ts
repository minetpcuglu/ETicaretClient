import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentsModule } from './components/components.module';
import { LayoutComponent } from './layout.component';



@NgModule({
  declarations: [
    LayoutComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ],
  exports:[   //dısarıdan erişileblir olmasını istiyorsak export edilmeli
    LayoutComponent
  ]
})
export class LayoutModule { }
