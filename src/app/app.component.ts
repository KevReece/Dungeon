import { Component } from '@angular/core';
import { Charactor } from './model/celloccupiers/charactor.model';
import { MapGrid } from './model/map-grid.model';
import { MapBuilderService } from './map-builder.service';
import { Direction } from './model/direction.model';
import { FactoryService } from './factory.service';
import { UserConsoleService } from './user-console.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Dungeon';
  mapGrid: MapGrid;
  charactor: Charactor;

  actionHandler(direction: Direction) {
    this.charactor.act(direction);
  }

  constructor(
      private mapBuilderService: MapBuilderService,
      private factoryService: FactoryService,
      private userConsoleService: UserConsoleService) {
    this.charactor = factoryService.createCharactor();
    this.mapGrid = mapBuilderService.getMapGrid(this.charactor);
    userConsoleService.writeWelcome();
  }
}
