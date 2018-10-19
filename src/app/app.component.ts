import { Component } from '@angular/core';
import { Charactor } from './model/charactor.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Dungeon';
  consoleLines = ['AppComponent started'];
  charactor = new Charactor();

  constructor(){
    this.consoleLines.push('AppComponent constructor started')
  }
}
