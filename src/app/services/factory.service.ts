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
import { LevelUpgradeService } from './level-upgrade.service';
import { WeightedOptions } from '../model/weighted-options.model';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {
  userConsoleService: UserConsoleService;
  fightService: FightService;
  levelUpgradeService: LevelUpgradeService;

  setUpDependencies(userConsoleService: UserConsoleService, fightService: FightService, levelUpgradeService: LevelUpgradeService): void {
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
  createEmptyCell(): Cell {
    return new Cell();
  }
  createWall(): Wall {
    return new Wall();
  }
  createCharacter(): Character {
    return new Character(this.userConsoleService, this.fightService, this.levelUpgradeService);
  }
  createTreasureChest(): TreasureChest {
    return new TreasureChest(this.userConsoleService, this);
  }
  createEnemy(): Enemy {
    return new Enemy(this);
  }
  createRandomInteger(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  createGold(): Gold {
    return new Gold(this);
  }
  createWeightedOptions(): WeightedOptions {
    return new WeightedOptions(this);
  }
}
