import { Component } from '@angular/core';
import { MessageType, PositionType } from './services/admin/alertify.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $:any //jquery eklenmek için kullanma

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ETicaretClient';
  constructor(private toastrService:CustomToastrService){
    toastrService.message("merhaba","mine",{
      messageType:ToastrMessageType.Success,position:ToastrPosition.BottomCenter
    });
  }
}


