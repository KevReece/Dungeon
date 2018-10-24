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
export class MapLoaderService {

  constructor(private httpClient: HttpClient, private factoryService: FactoryService) { }

  loadMapGrid(mapGrid: MapGrid, character: Character, enemies: Enemy[]): Promise<void> {
    return this.httpClient.get('assets/maps/1.map', {responseType: 'text'}).toPromise()
      .then((response) => this.buildGridFromFile(response, mapGrid, character, enemies));
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
