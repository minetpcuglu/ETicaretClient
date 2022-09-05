import { HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { NgxFileDropEntry } from 'ngx-file-drop';

import { AlertifyService, MessageType, PositionType } from '../../admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from '../../ui/custom-toastr.service';
import { HttpClientService } from '../http-client.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.scss']
})
export class FileUploadComponent  { 

  constructor(private httpClientService:HttpClientService,
    private alertifyService:AlertifyService,
    private customToastrService:CustomToastrService){

  }
  public files: NgxFileDropEntry[] ;
  
  //parametreyi(konfigurasyon degerleri) yakalamak için
 @Input() options:Partial<FileUploadOptions>;

  public selectedFiles(files: NgxFileDropEntry[]) {
    this.files = files;

    const fileData:FormData = new FormData();
    for(const file of files){
      (file.fileEntry as FileSystemFileEntry).file((_fileCallBack:File)=>{ //file dönüştürme
      fileData.append(_fileCallBack.name,_fileCallBack,file.relativePath); //seçilen tüm doyasları file içine eklendi
      });
    }
    //dosya gönderme istegi işlemi
    this.httpClientService.post({
        controller:this.options.controller,
        action:this.options.action,
        queryString:this.options.queryString,
        headers:new HttpHeaders({"responseType":"blob"})
    },fileData).subscribe(data=>{  //basarılı ise
  

      //iki yerdede mesaj ortak nokta oldugu için tek bir yerden verme
      const message : string ="Dosyalar basarı ile yüklendi"
    if(this.options.isAdminPage)
    {
        this.alertifyService.message(message,{
        dismissOthers:true,
       messageType:MessageType.Success,
       positionType:PositionType.TopRigth
     })
    }
    else
    {
     this.customToastrService.message(message, "Başarılı",{
       messageType:ToastrMessageType.Success,
       position:ToastrPosition.TopRigth
     })
    }
    },(errorResponse:HttpErrorResponse)=>{  //hata varsa
      //iki yerdede mesaj ortak nokta oldugu için tek bir yerden verme
      const message : string ="Dosya yükleme sırasında bir hata ile karşılaşıldı"
    if(this.options.isAdminPage)
    {
        this.alertifyService.message(message,{
        dismissOthers:true,
       messageType:MessageType.Error,
       positionType:PositionType.TopRigth
     })
    }
    else
    {
     this.customToastrService.message(message, "Başarısız",{
       messageType:ToastrMessageType.Error,
       position:ToastrPosition.TopRigth
     })
    }
    })
  }
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
}

