import { Component, OnInit, TRANSLATIONS } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { NgxSpinnerService } from 'ngx-spinner';
import { BaseComponent } from 'src/app/base/base.component';
import { CreateUser } from 'src/app/contracts/users/createuser';
import { User } from 'src/app/entities/user';
import { PositionType } from 'src/app/services/admin/alertify.service';
import { UserService } from 'src/app/services/common/models/user.service';
import { CustomToastrService, ToastrMessageType, ToastrPosition } from 'src/app/services/ui/custom-toastr.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent extends BaseComponent implements OnInit {

  constructor( private formBuilder:FormBuilder,private userService:UserService,private toastrService:CustomToastrService,private spinner:NgxSpinnerService) { 
   super(spinner)
  } //reactiveform

  frm:FormGroup;
  ngOnInit(): void {
    this.frm=this.formBuilder.group({
      nameSurname:["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(2)
      ]],
      username:["", [
        Validators.required,
        Validators.maxLength(500),
        Validators.minLength(2)
      ]],
      email:["", [
        Validators.required,
        Validators.email,
        Validators.maxLength(500),
        Validators.minLength(2)
      ]],
      password:["",
    [
      Validators.required
    ]],
      passwordConfirm:["",
    [
      Validators.required
    ]]
    },
    {
      validator:(group:AbstractControl):ValidationErrors | null =>{
        let password = group.get("password").value;
        let passwordConfirm = group.get("passwordConfirm").value; 
        return password==passwordConfirm ? null :{notSame:true};
      }
    })
  }

  get component(){
    return this.frm.controls;
  }

  submitted:boolean=false;
  async onSubmit(user:User){  //tip güvenligi icin
    this.submitted=true;
    if(this.frm.invalid)
    return;

  const result:CreateUser = await this.userService.create(user);
  if(result.succeeded)
    this.toastrService.message(result.message,"Kullanıcı kaydı başarılı",{
      messageType:ToastrMessageType.Success,
      position:ToastrPosition.TopRigth
    })

    else
    this.toastrService.message(result.message,"Kullanıcı kaydı başarısız",{
      messageType:ToastrMessageType.Error,
      position:ToastrPosition.TopRigth
  })
}
}
  
