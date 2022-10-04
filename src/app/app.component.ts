import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MessageType, PositionType } from './services/admin/alertify.service';
import { AuthService } from './services/common/auth.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from './services/ui/custom-toastr.service';
declare var $:any //jquery eklenmek için kullanma

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(private toastrService:CustomToastrService,public authService:AuthService,private router:Router){
authService.identityCheck();
    }

    signOut(){
      localStorage.removeItem("token");
      this.authService.identityCheck();
      this.router.navigate([""]);
      this.toastrService.message("Oturum Kapatıldı","Oturum Kapatılmıştır",{
        messageType:ToastrMessageType.Warning,
        position:ToastrPosition.TopRigth
      })
    }
  }



