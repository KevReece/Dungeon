import { Injectable } from '@angular/core';
import { Gold } from '../model/cellitems/gold.model';
import { ICellItem } from '../model/cellitems/i-cell-item.model';

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

  private getStringFromItem(item: ICellItem): String {
    if (item instanceof Gold) {
      return item.quantity + ' gold';
    } else {
      return 'something unknown';
    }
  }
}
