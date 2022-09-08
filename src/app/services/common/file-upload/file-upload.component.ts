import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxFileDropEntry } from 'ngx-file-drop';
import { NgxSpinnerService } from 'ngx-spinner';
import { SpinnerType } from 'src/app/base/base.component';
import { FileUploadDialogComponent, FileUploadDialogState } from 'src/app/dialogs/file-upload-dialog/file-upload-dialog.component';

import { AlertifyService, MessageType, PositionType } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { DialogService } from '../dialog.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent  { 

  constructor(private httpClientService:HttpClientService,
    private alertifyService:AlertifyService,
    private customToastrService:CustomToastrService,
    private dialog:MatDialog,
    private dialogSevice:DialogService,
    private spinner: NgxSpinnerService){

  }
  public files: NgxFileDropEntry[] ;
  
//   //parametreyi(konfigurasyon degerleri) yakalamak için
@Input() options: Partial<FileUploadOptions>;

public selectedFiles(files: NgxFileDropEntry[]) {
  this.files = files;
  const fileData: FormData = new FormData();
  for (const file of files) {
    (file.fileEntry as FileSystemFileEntry).file((_file: File) => { //file dönüştürme
      fileData.append(_file.name, _file, file.relativePath);  //seçilen tüm doyasları file içine eklendi
    });
  }
  this.dialogSevice.openDialog({
    componentType: FileUploadDialogComponent,
    data: FileUploadDialogState.yes,
    afterClosed: () => {
      this.spinner.show(SpinnerType.BallAtom)
      this.httpClientService.post({
        controller: this.options.controller,
        action: this.options.action,
        queryString: this.options.queryString,
        headers: new HttpHeaders({ "responseType": "blob" })
      }, fileData).subscribe(data => { //başarılı ise
        //iki yerdede mesaj ortak nokta oldugu için tek bir yerden verme
        const message: string = "Dosyalar başarıyla yüklenmiştir.";

        this.spinner.hide(SpinnerType.BallAtom);
        if (this.options.isAdminPage) {
          this.alertifyService.message(message,
            {
              dismissOthers: true,
              messageType: MessageType.Success,
              positionType: PositionType.TopRigth
            })
        } else {
          this.customToastrService.message(message, "Başarılı.", {
            messageType: ToastrMessageType.Success,
            position: ToastrPosition.TopRigth
          })
        }


      }, (errorResponse: HttpErrorResponse) => { //hata varsa
        //iki yerdede mesaj ortak nokta oldugu için tek bir yerden verme
        const message: string = "Dosyalar yüklenirken beklenmeyen bir hatayla karşılaşılmıştır.";

        this.spinner.hide(SpinnerType.BallAtom)
        if (this.options.isAdminPage) {
          this.alertifyService.message(message,
            {
              dismissOthers: true,
              messageType: MessageType.Error,
              positionType:PositionType.TopRigth
            })
        } else {
          this.customToastrService.message(message, "Başarsız.", {
            messageType: ToastrMessageType.Error,
            position: ToastrPosition.TopRigth
          })
        }

      });
    }
  });
}

//openDialog(afterClosed: any): void {
//  const dialogRef = this.dialog.open(FileUploadDialogComponent, {
//    width: '250px',
//    data: FileUploadDialogState.Yes,
//  });

//  dialogRef.afterClosed().subscribe(result => {
//    if (result == FileUploadDialogState.Yes)
//      afterClosed();
//  });
//}

}

//hangi dosyaların eklendigini belirlemek icin parametre yöntemini kullanarak bu servisi kullanıcak clienttan gelir
//tip güvenli karsılama best practis
export class FileUploadOptions{
controller?:string; //dosyalar hangi controller gidicek7
action?:string;
queryString?:string; //idye göre göndermede bu id ye sahip dosyalar
explanation?:string;  //nerede kullanıyoruz
accept?:string  //hangi türden alıcak img vs..
isAdminPage?:boolean=false;  //bildirim için kullanıldıgı yer admin mi UI mi anlamak için (toastr true ise alertify)
Page?: boolean = false;
}