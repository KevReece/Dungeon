import { Injectable } from '@angular/core';
import { Character } from '../model/celloccupiers/character.model';
import { Enemy } from '../model/celloccupiers/enemy.model';
import { Cell } from '../model/cell.model';

@Injectable({
  providedIn: 'root'
})
export class EnemySorterService {
  sort(enemies: Enemy[], character: Character): void {
    enemies.sort((a, b) => this.compareTargetDistanceThenAngleFromTarget(a.cell, b.cell, character.cell));
  }

  private compareTargetDistanceThenAngleFromTarget(cellA: Cell, cellB: Cell, targetCell: Cell): number {
    const aDistance = cellA.getDistance(targetCell);
    const bDistance = cellB.getDistance(targetCell);
    return aDistance === bDistance
      ? targetCell.getAngleFromUpTo(cellA) - targetCell.getAngleFromUpTo(cellB)
      : aDistance - bDistance;
  }
}
