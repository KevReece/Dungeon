import { Injectable, Injector } from '@angular/core';
import { Character } from '../model/celloccupiers/character.model';
import { Cell } from '../model/cell.model';
import { Wall } from '../model/celloccupiers/wall.model';
import { CellOccupier } from '../model/celloccupiers/cell-occupier.model';
import { TreasureChest } from '../model/celloccupiers/treasure-chest.model';
import { UserConsoleService } from './user-console.service';
import { Enemy } from '../model/celloccupiers/enemy.model';
import { FightService } from './fight.service';
import { Gold } from '../model/cellitems/gold.model';
import { CharacterLevelUpgradeService } from './character-level-upgrade.service';
import { WeightedOptions } from '../model/weighted-options.model';
import { Hole } from '../model/celloccupiers/hole.model';
import { AppComponent } from '../app.component';
import { Food } from '../model/cellitems/food.model';
import { Goblin } from '../model/celloccupiers/enemies/goblin.model';
import { Orc } from '../model/celloccupiers/enemies/orc.model';
import { Troll } from '../model/celloccupiers/enemies/troll.model';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {
  userConsoleService: UserConsoleService;
  fightService: FightService;
  levelUpgradeService: CharacterLevelUpgradeService;
  appComponent: AppComponent;

  setUpDependencies(
      appComponent: AppComponent,
      userConsoleService: UserConsoleService,
      fightService: FightService,
      levelUpgradeService: CharacterLevelUpgradeService): void {
    this.appComponent = appComponent;
    this.userConsoleService = userConsoleService;
    this.fightService = fightService;
    this.levelUpgradeService = levelUpgradeService;
  }

  createCellOccupiedBy(cellOccupier: CellOccupier): Cell {
    return new Cell(cellOccupier);
  }
  createTreasureChestCell(): Cell {
    return this.createCellOccupiedBy(this.createTreasureChest());
  }
  createWallCell(): Cell {
    return this.createCellOccupiedBy(this.createWall());
  }
  createHoleCell(targetMapLevelNumber: number): Cell {
    return this.createCellOccupiedBy(this.createHole(targetMapLevelNumber));
  }
  createEmptyCell(): Cell {
    return new Cell();
  }
  createWall(): Wall {
    return new Wall();
  }
  createHole(targetMapLevelNumber: number): Hole {
    return new Hole(this.appComponent, this.userConsoleService, targetMapLevelNumber);
  }
  createCharacter(): Character {
    return new Character(this.userConsoleService, this.fightService, this.levelUpgradeService);
  }
  createTreasureChest(): TreasureChest {
    return new TreasureChest(this.userConsoleService, this);
  }
  createEnemy(enemyName: string): Enemy {
    if (enemyName === Orc.name) {
      return new Orc(this, this.fightService, this.userConsoleService);
    }
    if (enemyName === Troll.name) {
      return new Troll(this, this.fightService, this.userConsoleService);
    }
    return new Goblin(this, this.fightService, this.userConsoleService);
  }
  createOrc(): Orc {
    return new Orc(this, this.fightService, this.userConsoleService);
  }
  createRandomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  createGold(): Gold {
    return new Gold(this);
  }
  createFood(): Food {
    return new Food();
  }
  createWeightedOptions(): WeightedOptions {
    return new WeightedOptions(this);
  }
}
