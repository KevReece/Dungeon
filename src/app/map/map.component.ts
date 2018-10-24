import { Component, Input } from '@angular/core';
import { MapGrid } from '../model/map-grid.model';
import { Cell } from '../model/cell.model';
import { Character } from '../model/celloccupiers/character.model';
import { Wall } from '../model/celloccupiers/wall.model';
import { TreasureChest } from '../model/celloccupiers/treasure-chest.model';
import { Enemy } from '../model/celloccupiers/enemy.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent {

  @Input() mapGrid: MapGrid;

  showCell(cell: Cell) {
    if (cell.occupier instanceof Character) {
      return 'B';
    } else if (cell.occupier instanceof Enemy) {
      return 'E';
    } else if (cell.occupier instanceof Wall) {
      return 'X';
    } else if (cell.occupier instanceof TreasureChest) {
      return 'T';
    } else if (cell.items.length > 0) {
      return 'G';
    } else {
      return ' ';
    }
  }
}
