import { Component, OnInit, Input } from '@angular/core';
import { MapGrid } from '../model/map-grid.model';
import { ICell } from '../model/icell.model';
import { Wall } from '../model/wall.model';
import { Floor } from '../model/floor.model';

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

  showCell(cell: ICell){
    if (cell instanceof Floor){
      if (cell.cellItem){
        return "B";
      } else {
        return " ";
      }
    } else {
      return "X";
    } 
  }
}
