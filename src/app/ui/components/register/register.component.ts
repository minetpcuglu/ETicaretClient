import { Component, OnInit, TRANSLATIONS } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor( private formBuilder:FormBuilder) { } //reactiveform

  frm:FormGroup;
  ngOnInit(): void {
    this.frm=this.formBuilder.group({
      adSoyad:["", [
        Validators.required,
        Validators.maxLength(50),
        Validators.minLength(2)
      ]],
      kullaniciAdi:["", [
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
      sifre:["",
    [
      Validators.required
    ]],
      sifreTekrar:["",
    [
      Validators.required
    ]]
    },
    {
      validator:(group:AbstractControl):ValidationErrors | null =>{
        let sifre = group.get("sifre").value;
        let sifreTekrar = group.get("sifreTekrar").value; 
        return sifre==sifreTekrar ? null :{notSame:true};
      }
    })
  }

  get component(){
    return this.frm.controls;
  }

  submitted:boolean=false;
  onSubmit(data:any){
    this.submitted=true;
    if(this.frm.invalid)
    return;
debugger;
  }

}
