import { Injectable } from '@angular/core';
import { Gold } from '../model/cellitems/gold.model';
import { ICellItem } from '../model/cellitems/i-cell-item.model';
import { Fighter } from '../model/celloccupiers/fighter.model';
import { Enemy } from '../model/celloccupiers/enemy.model';

@Injectable({
  providedIn: 'root'
})
export class UserConsoleService {
  lines: string[] = [];

  writeWelcome(): void {
    this.lines.push('Welcome to the Dungeon!');
  }

  writeTreasureChestOpenedAndGoldDropped(droppedGold: Gold): void {
    this.lines.push('The opened treasure chest reveals ' + droppedGold.quantity + ' gold');
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

  writeExperienceGained(experience: number): void {
    this.lines.push(experience + ' experience points gained!');
  }

  writeLevelUpgraded(level: number): void {
    this.lines.push('Congratulations you\'ve progressed your skills to level ' + level + '!');
  }

  private getStringFromItem(item: ICellItem): String {
    if (item instanceof Gold) {
      return item.quantity + ' gold';
    } else {
      return 'something unknown';
    }
  }
}
