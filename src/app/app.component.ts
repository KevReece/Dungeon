import { Component } from '@angular/core';
import { Charactor } from './model/celloccupiers/charactor.model';
import { MapGrid } from './model/map-grid.model';
import { MapBuilderService } from './services/map-builder.service';
import { Direction } from './model/direction.model';
import { FactoryService } from './services/factory.service';
import { UserConsoleService } from './services/user-console.service';
import { Enemy } from './model/celloccupiers/enemy.model';
import { EnemySorterService } from './services/enemy-sorter.service';

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
    this.enemySorterService.sort(this.enemies, this.charactor);
  }

  constructor(
      private mapBuilderService: MapBuilderService,
      private factoryService: FactoryService,
      private userConsoleService: UserConsoleService,
      private enemySorterService: EnemySorterService) {
    this.charactor = factoryService.createCharactor();
    const sortEnemiesFunction = function(mapGrid: MapGrid): void {
      enemySorterService.sort(this.enemies, this.charactor);
    };
    this.mapGrid = mapBuilderService.getMapGrid(this.charactor, this.enemies, sortEnemiesFunction);

    userConsoleService.writeWelcome();
  }
}
