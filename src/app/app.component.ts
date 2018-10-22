import { Component } from '@angular/core';
import { Charactor } from './model/charactor.model';
import { MapGrid } from './model/map-grid.model';
import { MapBuilderService } from './map-builder.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Dungeon';
  consoleLines = ['Welcome to dungeon!'];
  charactor = new Charactor();
  mapGrid: MapGrid;

  constructor(private mapBuilderService: MapBuilderService) {
    this.mapGrid = mapBuilderService.getMapGrid(this.charactor);
  }
}
