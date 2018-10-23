import { Injectable } from '@angular/core';
import { Gold } from './model/cellitems/gold.model';

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
}
