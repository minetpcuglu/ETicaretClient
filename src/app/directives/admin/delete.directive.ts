import { Directive, ElementRef } from '@angular/core';

@Directive({
  selector: '[appDelete]'
})
//tek bir keyword sayesinde tüm projedeki admin tarafında kullanıcaz
export class DeleteDirective {

  constructor(private elemet:ElementRef) //directive cagırılan(kullandıgımız) html nesnesini elde etmek icin
   {
//nesneye müdahale edebilmek icin // manipülaston işlemleri gerceklestirmek icin

  }

}
