import { Injectable, Injector } from '@angular/core';
import { Character } from '../model/celloccupiers/character.model';
import { Cell } from '../model/cell.model';
import { Wall } from '../model/celloccupiers/wall.model';
import { CellOccupier } from '../model/celloccupiers/cell-occupier.model';
import { TreasureChest } from '../model/celloccupiers/treasure-chest.model';
import { UserConsoleService } from './user-console.service';
import { Enemy } from '../model/celloccupiers/enemy.model';
import { FightService } from './fight.service';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {
  private userConsoleService: UserConsoleService;

  constructor(private injector: Injector) { }

  getUserConsoleService(): UserConsoleService {
    if (!this.userConsoleService) {
      this.userConsoleService = this.injector.get(UserConsoleService);
    }
    return this.userConsoleService;
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
  createCharacter(fightService: FightService): Character {
    return new Character(this.getUserConsoleService(), fightService);
  }
  createTreasureChest(): TreasureChest {
    return new TreasureChest(this.getUserConsoleService());
  }
  createEnemy(): Enemy {
    return new Enemy();
  }
  createRandomNumber(min, max): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
}
