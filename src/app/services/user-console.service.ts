import { Injectable } from '@angular/core';
import { Gold } from '../model/cellitems/gold.model';
import { ICellItem } from '../model/cellitems/i-cell-item.model';
import { Fighter } from '../model/celloccupiers/fighter.model';
import { Enemy } from '../model/celloccupiers/enemy.model';
import { Character } from '../model/celloccupiers/character.model';
import { Food } from '../model/cellitems/food.model';

@Injectable({
  providedIn: 'root'
})
export class UserConsoleService {
  lines: string[] = [];

  startAndWelcome(): void {
    this.lines.length = 0;
    this.lines.push('Welcome to the Dungeon!');
  }

  writeTreasureChestOpenedAndGoldDropped(droppedGold: Gold): void {
    this.lines.push('The opened treasure chest reveals ' + droppedGold.quantity + ' gold');
  }

  writeTreasureChestOpenedAndFoodDropped(): void {
    this.lines.push('The opened treasure chest reveals some food');
  }

  writeItemsCollected(items: ICellItem[]): void {
    this.lines.push('You\'ve collected: ' + items.map(this.getStringFromItem).join(', '));
  }

  writeAttackSucceeded(attacker: Fighter, defender: Fighter, damage: Number): void {
    this.lines.push(attacker.name + ' attack on ' + defender.name + ' succeeded! ' + damage + ' damage inflicted');
  }

  writeAttackFailed(attacker: Fighter, defender: Fighter): void {
    this.lines.push(attacker.name + ' attack on ' + defender.name + ' failed');
  }

  writeEnemyDied(enemy: Enemy): void {
    this.lines.push(enemy.name + ' has been slain!');
  }

  writeCharacterDied(character: Character): void {
    this.lines.push(character.name + ' has been killed escaping from the dungeon! All is lost');
  }

  writeExperienceGained(experience: number): void {
    this.lines.push(experience + ' experience points gained!');
  }

  writeLevelUpgraded(level: number): void {
    this.lines.push('Congratulations you\'ve progressed your skills to level ' + level + '!');
  }

  writeHoleEntered(newMapLevel: number): void {
    this.lines.push('You\'ve decended into dungeon level ' + newMapLevel + '!');
  }

  writeEnemySpawned(spawnedEnemy: Enemy): void {
    this.lines.push('A ' + spawnedEnemy.name.toLowerCase() + ' has entered the dungeon.');
  }

  private getStringFromItem(item: ICellItem): String {
    if (item instanceof Gold) {
      return item.quantity + ' gold';
    }
    if (item instanceof Food) {
      return ' some food';
    }
    return 'something unknown';
  }
}
