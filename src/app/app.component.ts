import { Component } from '@angular/core';
import { Charactor } from './model/celloccupiers/charactor.model';
import { MapGrid } from './model/map-grid.model';
import { MapBuilderService } from './services/map-builder.service';
import { Direction } from './model/direction.model';
import { FactoryService } from './services/factory.service';
import { UserConsoleService } from './services/user-console.service';
import { Enemy } from './model/celloccupiers/enemy.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'Dungeon';
  mapGrid: MapGrid;
  charactor: Charactor;
  enemies: Enemy[] = [];

  actionHandler(direction: Direction) {
    this.charactor.act(direction);
  }

  constructor(
      private mapBuilderService: MapBuilderService,
      private factoryService: FactoryService,
      private userConsoleService: UserConsoleService) {
    this.charactor = factoryService.createCharactor();
    this.mapGrid = mapBuilderService.getMapGrid(this.charactor, this.enemies);
    userConsoleService.writeWelcome();
  }
}
