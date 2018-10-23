import { Injectable } from '@angular/core';
import { Row } from '../model/row.model';
import { MapGrid } from '../model/map-grid.model';
import { HttpClient } from '@angular/common/http';
import { Character } from '../model/celloccupiers/character.model';
import { FactoryService } from './factory.service';
import { Enemy } from '../model/celloccupiers/enemy.model';

@Injectable({
  providedIn: 'root'
})
export class MapBuilderService {

  constructor(private httpClient: HttpClient, private factoryService: FactoryService) { }

  getMapGrid(character: Character, enemies: Enemy[], onCompleteFunction?: (mapGrid) => any) {
    const mapGrid = new MapGrid([]);
    this.httpClient.get('assets/maps/1.map', {responseType: 'text'})
      .subscribe((response) => {
        this.buildGridFromFile(response, mapGrid, character, enemies);
        if (onCompleteFunction) {
          onCompleteFunction(mapGrid);
        }
      });
    return mapGrid;
  }

  private buildGridFromFile(file: String, mapGrid: MapGrid, character: Character, enemies: Enemy[]) {
    const rows = [];
    file.split('\n').forEach(rowString => {
      const rowCells = [];
      rowString.split('').forEach(cellChar => rowCells.push(this.buildCell(cellChar, character, enemies)));
      rows.push(new Row(rowCells));
    });
    mapGrid.rows = rows;
    mapGrid.setupCells();
  }

  private buildCell(cellChar: String, character: Character, enemies: Enemy[]) {
    switch (cellChar) {
      case 'X': return this.factoryService.createWallCell();
      case 'T': return this.factoryService.createTreasureChestCell();
      case 'E': {
        const enemy = this.factoryService.createEnemy();
        enemies.push(enemy);
        return this.factoryService.createCellOccupiedBy(enemy);
      }
      case 'B': return this.factoryService.createCellOccupiedBy(character);
      default: return this.factoryService.createEmptyCell();
    }
  }
}