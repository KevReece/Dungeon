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
import { LevelUpgradeService } from './services/level-upgrade.service';
import { TurnEngineService } from './services/turn-engine.service';
import { ActionOption } from './model/action-option';

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
  actionOptions: ActionOption[] = [];

  constructor(
      private mapLoaderService: MapLoaderService,
      private factoryService: FactoryService,
      private userConsoleService: UserConsoleService,
      private enemySorterService: EnemySorterService,
      private fightService: FightService,
      private levelUpgradeService: LevelUpgradeService,
      private turnEngineService: TurnEngineService) {
        this.factoryService.setUpDependencies(this.userConsoleService, this.fightService, this.levelUpgradeService);
      }

  ngOnInit(): void {
    this.restart();
  }

  restart(): void {
    this.enemies = [];
    this.actionOptions = [ActionOption.None, ActionOption.None, ActionOption.None, ActionOption.None];
    this.mapGrid = new MapGrid([]);
    this.character = this.factoryService.createCharacter();
    this.levelUpgradeService.initialize(this.character);
    this.mapLoadPromise = this.mapLoaderService.loadMapGrid(this.mapGrid, this.character, this.enemies)
      .then(() => {
        this.enemySorterService.sort(this.enemies, this.character);
        this.actionOptions = this.character.getActionOptions();
      });
    this.turnEngineService.initialize(this.character, this.enemies);
    this.userConsoleService.startAndWelcome();
  }

  actionHandler(direction: Direction) {
    this.actionOptions = this.turnEngineService.executeTurn(direction);
  }
}
