import { Component } from '@angular/core';
import { Character } from './model/celloccupiers/character.model';
import { MapGrid } from './model/map-grid.model';
import { MapLoaderService } from './services/map-loader.service';
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
  mapGrid: MapGrid = new MapGrid([]);
  character: Character;
  enemies: Enemy[] = [];
  mapLoadPromise: Promise<void>;

  actionHandler(direction: Direction) {
    this.character.act(direction);
    this.enemySorterService.sort(this.enemies, this.character);
  }

  constructor(
      private mapLoaderService: MapLoaderService,
      private factoryService: FactoryService,
      private userConsoleService: UserConsoleService,
      private enemySorterService: EnemySorterService) {
    this.character = factoryService.createCharacter();
    this.mapLoadPromise = mapLoaderService.loadMapGrid(this.mapGrid, this.character, this.enemies)
      .then(() => {console.log('here'); enemySorterService.sort(this.enemies, this.character); });

    userConsoleService.writeWelcome();
  }
}
