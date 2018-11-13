import { Component, Input } from '@angular/core';
import { MapGrid } from '../model/map-grid.model';
import { Cell } from '../model/cell.model';
import { Character } from '../model/celloccupiers/character.model';
import { Wall } from '../model/celloccupiers/wall.model';
import { TreasureChest } from '../model/celloccupiers/treasure-chest.model';
import { Enemy } from '../model/celloccupiers/enemy.model';
import { Hole } from '../model/celloccupiers/hole.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent {

  @Input() mapGrid: MapGrid;

  showCell(cell: Cell) {
    if (cell.occupier instanceof Character) {
      return 'character';
    } else if (cell.occupier instanceof Enemy) {
      return 'goblin';
    } else if (cell.occupier instanceof Wall) {
      return 'wall';
    } else if (cell.occupier instanceof TreasureChest) {
      return 'treasureChest';
    } else if (cell.occupier instanceof Hole) {
      return 'hole';
    } else if (cell.items.length > 0) {
      return 'gold';
    } else {
      return 'none';
    }
  }
}
