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
import { CharacterLevelUpgradeService } from './services/character-level-upgrade.service';
import { TurnEngineService } from './services/turn-engine.service';
import { ActionOption } from './model/action-option';
import { EnemySpawnerService } from './services/enemy-spawner.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {
  mapGrid: MapGrid;
  character: Character;
  enemies: Enemy[] = [];
  mapLoadPromise: Promise<void>;
  actionOptions: ActionOption[] = [];
  mapLevelNumber: number;

  constructor(
      private mapLoaderService: MapLoaderService,
      private factoryService: FactoryService,
      private userConsoleService: UserConsoleService,
      private enemySorterService: EnemySorterService,
      private fightService: FightService,
      private levelUpgradeService: CharacterLevelUpgradeService,
      private turnEngineService: TurnEngineService,
      private enemySpawnerService: EnemySpawnerService) {
        this.factoryService.setUpDependencies(this, this.userConsoleService, this.fightService, this.levelUpgradeService);
      }

  ngOnInit(): void {
    this.restart();
  }

  restart(): void {
    this.character = this.factoryService.createCharacter();
    this.levelUpgradeService.initialize(this.character);
    this.startMapLevel(1);
    this.userConsoleService.startAndWelcome();
  }

  startMapLevel(levelNumber: number): void {
    this.mapLevelNumber = levelNumber;
    this.enemies = [];
    this.actionOptions = [ActionOption.None, ActionOption.None, ActionOption.None, ActionOption.None];
    this.mapGrid = this.factoryService.createMapGrid([]);
    this.enemySpawnerService.initialize(this.mapGrid, levelNumber);
    this.turnEngineService.initialize(this.character, this.enemies, this.enemySpawnerService);
    this.mapLoadPromise = this.mapLoaderService
      .loadMapGrid(levelNumber, this.mapGrid, this.character, this.enemies, this.enemySpawnerService)
      .then(() => {
        this.enemySorterService.sort(this.enemies, this.character);
        this.actionOptions = this.character.getActionOptions();
      });
  }

  actionHandler(direction: Direction) {
    this.actionOptions = this.turnEngineService.executeTurn(direction);
  }
}
