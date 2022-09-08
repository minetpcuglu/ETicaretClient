import { HttpErrorResponse } from '@angular/common/http';
import { Directive, ElementRef,EventEmitter,HostListener,Input,Output,Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import {  SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { AlertifyService, MessageType, PositionType } from 'src/app/services/admin/alertify.service';
import { DialogService } from 'src/app/services/common/dialog.service';
import { HttpClientService } from 'src/app/services/common/http-client.service';

//js kullanımı ıcın
declare var $: any;


//directice kullanmak icin ilgili td ye appdelete yazmak yeterli
@Directive({
  selector: '[appDelete]'
})

//tek bir keyword sayesinde tüm projedeki admin tarafında kullanıcaz
export class DeleteDirective {
  constructor(
    private element:ElementRef, //directive cagırılan(kullandıgımız) html nesnesini elde etmek icin
    private _renderer:Renderer2,//nesneye müdahale edebilmek icin // manipülaston işlemleri gerceklestirmek icin
    private httpClientService:HttpClientService,  //delete işlemi yaparken http olarak ilgili id ye istek göndermek icin
    private spinner:NgxSpinnerService,
    public dialog: MatDialog,
    private alertifyService:AlertifyService,
    private dialogService:DialogService)
   {
    
const img = _renderer.createElement("img");
img.setAttribute("src","../../../../../assets/delete.png")
img.setAttribute("style","cursor:pointer;");
_renderer.appendChild(element.nativeElement,img)
   }

//delete işlemi için
@Input() controller:string;  //hangi controoler
@Input() action:string //hangi action bunları istenilen action ve controller göre ayarlamk için parametre ekliyoruz
@Input() id:string; //id yi yakalamak icin   
@Output() callbackdeletedirectivesayfayenileme :EventEmitter<any> = new EventEmitter();   ////silindikten sonra tablonun yenilenmesi icin


@HostListener("click")//ne zaman devreye girecek ne zaman tıklanılırsa 
async onclick(){
  this.dialogService.openDialog({
    componentType:DeleteDialogComponent,
    data:DeleteState.Yes,
    afterClosed:async () => {
    this.spinner.show(SpinnerType.BallAtom);//silerken spinner 
    const td :HTMLTableCellElement =this.element.nativeElement //silme işlemi yapılacak satıra ulasmak ıcın
   //httpapi ile veri tabanından silme
   await this.httpClientService.delete({
     controller:this.controller,
    action:this.action,
   }, this.id).subscribe(data=>{
   
    $(td.parentElement).animate({opacit:0,left:"+=50",height:"toogle"},700,() => {
      this.callbackdeletedirectivesayfayenileme.emit();////silindikten sonra tablonun yenilenmesi icin//callback fonk ile cagırma
         this.alertifyService.message("Silme işlemi başarı ile gerçekleşti",{
          dismissOthers:true, //var olan butun mesajları kapat
          messageType:MessageType.Success,
          positionType:PositionType.TopRigth
         })
    });
   },(errorResponse:HttpErrorResponse)=>{
    this.spinner.hide(SpinnerType.BallAtom);//silerken spinner 
    this.alertifyService.message("Silme işlemi gerçekleşmedi",{
      dismissOthers:true, //var olan butun mesajları kapat
      messageType:MessageType.Error,
      positionType:PositionType.TopRigth
     });
   });
  }
  });
}

  // //afterClosed:any //callbackfonk   //DİALOG SERVİCE TASINDI GENERİC HALE GELDİ
  // openDialog(afterClosed:any): void {
  //   const dialogRef = this.dialog.open(DeleteDialogComponent, {
  //     width: '250px',
  //     data:DeleteState.Yes,
  //   });

  //   dialogRef.afterClosed().subscribe(result => {
  //     if(result == DeleteState.Yes){
  //       afterClosed();
  //     }
  //   });
  // }


}


