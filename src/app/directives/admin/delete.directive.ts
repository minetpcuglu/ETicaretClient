import { Directive, ElementRef,EventEmitter,HostListener,Input,Output,Renderer2 } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { NgxSpinnerService } from 'ngx-spinner';
import {  SpinnerType } from 'src/app/base/base.component';
import { DeleteDialogComponent, DeleteState } from 'src/app/dialogs/delete-dialog/delete-dialog.component';
import { ProductService } from 'src/app/services/common/models/product.service';

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
    private productService:ProductService,  //delete işlemi yaparken http olarak ilgili id ye istek göndermek icin
    private spinner:NgxSpinnerService,
    public dialog: MatDialog)
   {
    
const img = _renderer.createElement("img");
img.setAttribute("src","../../../../../assets/delete.png")
img.setAttribute("style","cursor:pointer;");
_renderer.appendChild(element.nativeElement,img)
   }

//delete işlemi için
@Input() id:string; //id yi yakalamak icin   
@Output() callbackdeletedirectivesayfayenileme :EventEmitter<any> = new EventEmitter();   ////silindikten sonra tablonun yenilenmesi icin
@HostListener("click")//ne zaman devreye girecek ne zaman tıklanılırsa 

async onclick(){
  this.openDialog(async ()=>{
    this.spinner.show(SpinnerType.BallAtom);//silerken spinner 
    const td :HTMLTableCellElement =this.element.nativeElement //silme işlemi yapılacak satıra ulasmak ıcın
   //httpapi ile veri tabanından silme
   await this.productService.delete(this.id);
    $(td.parentElement).animate({opacit:0,left:"+=50",height:"toogle"},700 ,() => {
this.callbackdeletedirectivesayfayenileme.emit();////silindikten sonra tablonun yenilenmesi icin//callback fonk ile cagırma
    });
  }); 
}

  //afterClosed:any //callbackfonk
  openDialog(afterClosed:any): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      width: '250px',
      data:DeleteState.yes,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result == DeleteState.yes){
        afterClosed();
      }
    });
  }


}


