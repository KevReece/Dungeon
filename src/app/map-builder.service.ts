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

  getMapGrid(onCompleteFunction?: Function){
    let mapGrid = new MapGrid([]);
    this.httpClient.get('assets/maps/1.map', {responseType: 'text'})
      .subscribe((response) => {
        this.buildGridFromFile(response, mapGrid);
        if (onCompleteFunction) onCompleteFunction();
      })
    return mapGrid;
  }

  private buildGridFromFile(file, mapGrid){
    file.split('\n').forEach(rowString => {
      let rowCells = [];
      rowString.split('').forEach(cellChar => {
        if (cellChar == 'X'){
          rowCells.push(new Wall());
        } else {
          rowCells.push(new Floor());
        }
      });
      mapGrid.rows.push(new Row(rowCells));
    });
  }
}
