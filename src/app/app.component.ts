import { Component, OnInit, Injector } from '@angular/core';
import { Character } from './model/celloccupiers/character.model';
import { MapGrid } from './model/map-grid.model';
import { MapLoaderService } from './services/map-loader.service';
import { Direction } from './model/direction.model';
import { FactoryService } from './services/factory.service';
import { UserConsoleService } from './services/user-console.service';
import { Enemy } from './model/celloccupiers/enemy.model';
import { EnemySorterService } from './services/enemy-sorter.service';
import { FightService } from './services/fight.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  title = 'Dungeon';
  mapGrid: MapGrid = new MapGrid([]);
  character: Character;
  enemies: Enemy[] = [];
  mapLoadPromise: Promise<void>;

  constructor(
      private mapLoaderService: MapLoaderService,
      private factoryService: FactoryService,
      private userConsoleService: UserConsoleService,
      private enemySorterService: EnemySorterService,
      private fightService: FightService) {
        this.factoryService.setUpDependencies(this.userConsoleService, this.fightService);
      }

  ngOnInit(): void {
    this.character = this.factoryService.createCharacter();
    this.mapLoadPromise = this.mapLoaderService.loadMapGrid(this.mapGrid, this.character, this.enemies)
      .then(() => this.enemySorterService.sort(this.enemies, this.character));
    this.userConsoleService.writeWelcome();
  }

  actionHandler(direction: Direction) {
    this.character.act(direction);
    this.enemySorterService.sort(this.enemies, this.character);
  }
}
