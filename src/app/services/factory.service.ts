import { Injectable } from '@angular/core';
import { Character } from '../model/celloccupiers/character.model';
import { Cell } from '../model/cell.model';
import { Wall } from '../model/celloccupiers/wall.model';
import { CellOccupier } from '../model/celloccupiers/cell-occupier.model';
import { TreasureChest } from '../model/celloccupiers/treasure-chest.model';
import { UserConsoleService } from './user-console.service';
import { Enemy } from '../model/celloccupiers/enemy.model';

@Injectable({
  providedIn: 'root'
})
export class FactoryService {

  constructor(private userConsoleService: UserConsoleService) { }

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
    return new Character(this.userConsoleService);
  }
  createTreasureChest(): TreasureChest {
    return new TreasureChest(this.userConsoleService);
  }
  createEnemy(): Enemy {
    return new Enemy();
  }
}