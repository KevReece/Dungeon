import { Injectable } from '@angular/core';
import { Character } from '../model/celloccupiers/character.model';
import { Enemy } from '../model/celloccupiers/enemy.model';
import { Cell } from '../model/cell.model';

@Injectable({
  providedIn: 'root'
})
export class EnemySorterService {
  sort(enemies: Enemy[], character: Character): void {
    this.removeDeadEnemies(enemies);
    enemies.sort((a, b) => this.compareTargetDistanceThenAngleFromTarget(a.cell, b.cell, character.cell));
  }

  private removeDeadEnemies(enemies: Enemy[]) {
    for (let index = enemies.length - 1; index >= 0; index--) {
      if (!enemies[index].isAlive()) {
        enemies.splice(index, 1);
      }
    }
  }

  private compareTargetDistanceThenAngleFromTarget(cellA: Cell, cellB: Cell, targetCell: Cell): number {
    const aDistance = cellA.getDistance(targetCell);
    const bDistance = cellB.getDistance(targetCell);
    return aDistance === bDistance
      ? targetCell.getAngleFromUpTo(cellA) - targetCell.getAngleFromUpTo(cellB)
      : aDistance - bDistance;
  }
}
