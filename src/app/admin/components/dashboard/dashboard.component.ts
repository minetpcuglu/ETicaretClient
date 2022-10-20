import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent, SpinnerType } from 'src/app/base/base.component';
import { HubUrls } from 'src/app/constants/hub-urls';
import { ReceiveFunctions } from 'src/app/constants/receive-functions';
import { AlertifyService, MessageType, PositionType } from 'src/app/services/admin/alertify.service';
import { SignalRService } from 'src/app/services/common/signalr.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent extends BaseComponent implements OnInit{

  constructor( spinnerService:NgxSpinnerService,private alertify:AlertifyService,private signalRService:SignalRService) { 
    super(spinnerService);
    signalRService.start(HubUrls.ProductHub); //uygun endpointe baglama
  }

  ngOnInit(): void {
    this.signalRService.on(ReceiveFunctions.ProductAddedMessageReceiveFunctions,message=>{
      this.alertify.message(message,{
        messageType:MessageType.Success,
        positionType:PositionType.BottomRigth
      })
    //  alert(message);
    });//backendeki mesajı ngönderme adresi
  }

}


