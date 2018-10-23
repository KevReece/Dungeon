import { Component, OnInit, Input } from '@angular/core';
import { MapGrid } from '../model/map-grid.model';
import { Cell } from '../model/cell.model';
import { Charactor } from '../model/charactor.model';
import { Wall } from '../model/wall.model';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.sass']
})
export class MapComponent implements OnInit {

  @Input() mapGrid: MapGrid;

  constructor() { }

  ngOnInit() {
  }

  showCell(cell: Cell) {
    if (cell.occupier instanceof Charactor) {
      return 'B';
    } else if (cell.occupier instanceof Wall) {
      return 'X';
    } else {
      return ' ';
    }
  }
}
