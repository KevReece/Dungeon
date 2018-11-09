import { Injectable } from '@angular/core';
import { Direction } from '../model/direction.model';
import { Character } from '../model/celloccupiers/character.model';
import { EnemySorterService } from './enemy-sorter.service';
import { Enemy } from '../model/celloccupiers/enemy.model';
import { ActionOption } from '../model/action-option';

@Injectable({
  providedIn: 'root'
})
export class TurnEngineService {
  private character: Character;
  private enemies: Enemy[];

  constructor(private enemySorterService: EnemySorterService) { }

  initialize(character: Character, enemies: Enemy[]) {
    this.character = character;
    this.enemies = enemies;
  }

  executeTurn(charactorActionDirection: Direction): ActionOption[] {
    if (this.character.act(charactorActionDirection)) {
      this.enemySorterService.sort(this.enemies, this.character);
      this.enemies.forEach(enemy => enemy.act(this.character));
      this.enemySorterService.sort(this.enemies, this.character);
    }
    return this.character.getActionOptions();
  }
}
