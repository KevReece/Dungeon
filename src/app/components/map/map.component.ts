import { Component, Input } from '@angular/core';
import { MapGrid } from '../../model/map-grid.model';
import { Cell } from '../../model/cell.model';
import { Character } from '../../model/celloccupiers/character.model';
import { Wall } from '../../model/celloccupiers/wall.model';
import { TreasureChest } from '../../model/celloccupiers/treasure-chest.model';
import { Hole } from '../../model/celloccupiers/hole.model';
import { Gold } from 'src/app/model/cellitems/gold.model';
import { Food } from 'src/app/model/cellitems/food.model';
import { Enemy } from 'src/app/model/celloccupiers/enemy.model';

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
      return cell.occupier.name.toLowerCase();
    } else if (cell.occupier instanceof Wall) {
      return 'wall';
    } else if (cell.occupier instanceof TreasureChest) {
      return 'treasureChest';
    } else if (cell.occupier instanceof Hole) {
      return 'hole';
    } else if (cell.items.length > 0 && cell.items[0] instanceof Gold) {
      return 'gold';
    } else if (cell.items.length > 0 && cell.items[0] instanceof Food) {
      return 'food';
    } else {
      return 'none';
    }
  }
}
