import { Component } from '@angular/core';
import { Charactor } from './model/charactor.model';
import { MapGrid } from './model/map-grid.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Dungeon';
  consoleLines = ['AppComponent started'];
  charactor = new Charactor();
  mapGrid = new MapGrid();

  constructor(){
    this.consoleLines.push('AppComponent constructor started')
  }
}
