import { Component } from '@angular/core';
declare var $:any //jquery eklenmek için kullanma

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ETicaretClient';
}
