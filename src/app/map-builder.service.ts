import { Injectable } from '@angular/core';
import { Row } from './model/row.model';
import { MapGrid } from './model/map-grid.model';
import { HttpClient } from '@angular/common/http';
import { Wall } from './model/wall.model';
import { Floor } from './model/floor.model';

@Injectable({
  providedIn: 'root'
})
export class MapBuilderService {

  constructor(private httpClient: HttpClient) { }

  getMapGrid(){
    let mapGrid = new MapGrid();
    this.httpClient.get('assets/maps/basic.map', {responseType: 'text'})
      .subscribe((response) => this.buildGridFromFile(response, mapGrid))
    return mapGrid;
  }

  buildGridFromFile(file, mapGrid){
    file.split('\n').forEach(rowString => {
      let row = new Row();
      rowString.split('').forEach(cellChar => {
        if (cellChar == 'X'){
          row.cells.push(new Wall());
        } else {
          row.cells.push(new Floor());
        }
      });
      mapGrid.Rows.push(row);
    });
  }
}
