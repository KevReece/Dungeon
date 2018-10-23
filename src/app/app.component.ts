import { Component } from '@angular/core';
import { Character } from './model/celloccupiers/character.model';
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
  character: Character;
  enemies: Enemy[] = [];

  actionHandler(direction: Direction) {
    this.character.act(direction);
    this.enemySorterService.sort(this.enemies, this.character);
  }

  constructor(
      private mapBuilderService: MapBuilderService,
      private factoryService: FactoryService,
      private userConsoleService: UserConsoleService,
      private enemySorterService: EnemySorterService) {
    this.character = factoryService.createCharacter();
    const sortEnemiesFunction = function(mapGrid: MapGrid): void {
      enemySorterService.sort(this.enemies, this.character);
    };
    this.mapGrid = mapBuilderService.getMapGrid(this.character, this.enemies, sortEnemiesFunction);

    userConsoleService.writeWelcome();
  }
}
