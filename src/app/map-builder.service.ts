import { Injectable } from '@angular/core';
import { Row } from './model/row.model';
import { MapGrid } from './model/map-grid.model';
import { HttpClient } from '@angular/common/http';
import { Wall } from './model/celloccupiers/wall.model';
import { Cell } from './model/cell.model';
import { Charactor } from './model/celloccupiers/charactor.model';
import { TreasureChest } from './model/celloccupiers/treasure-chest.model';
import { FactoryService } from './factory.service';

@Injectable({
  providedIn: 'root'
})
export class MapBuilderService {

  constructor(private httpClient: HttpClient, private factoryService: FactoryService) { }

  getMapGrid(charactor: Charactor, onCompleteFunction?: (mapGrid) => any) {
    const mapGrid = new MapGrid([]);
    this.httpClient.get('assets/maps/1.map', {responseType: 'text'})
      .subscribe((response) => {
        this.buildGridFromFile(response, mapGrid, charactor);
        if (onCompleteFunction) {
          onCompleteFunction(mapGrid);
        }
      });
    return mapGrid;
  }

  private buildGridFromFile(file: String, mapGrid: MapGrid, charactor: Charactor) {
    const rows = [];
    file.split('\n').forEach(rowString => {
      const rowCells = [];
      rowString.split('').forEach(cellChar => rowCells.push(this.buildCell(cellChar, charactor)));
      rows.push(new Row(rowCells));
    });
    mapGrid.rows = rows;
    mapGrid.setAdjacentCells();
  }

  private buildCell(cellChar: String, charactor: Charactor) {
    switch (cellChar) {
      case 'X': return this.factoryService.createWallCell();
      case 'T': return this.factoryService.createTreasureChestCell();
      case 'B': return this.factoryService.createCellOccupiedBy(charactor);
      default: return this.factoryService.createEmptyCell();
    }
  }
}
