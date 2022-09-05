import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FileUploadComponent } from './file-upload.component';
import { NgxFileDropModule } from 'ngx-file-drop';



@NgModule({
  declarations: [
    FileUploadComponent,
  ],
  imports: [
    CommonModule,
    NgxFileDropModule
  ],
  exports:[
    FileUploadComponent //declare edilmiş componente selector üzerinden erişebilmek için o modulun içinde o component export edilmeli
  ]
})
export class FileUploadModule { }
