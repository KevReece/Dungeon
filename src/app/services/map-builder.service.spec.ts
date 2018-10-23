import { TestBed } from '@angular/core/testing';

import { MapBuilderService } from './map-builder.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MapGrid } from '../model/map-grid.model';
import { Wall } from '../model/celloccupiers/wall.model';
import { Cell } from '../model/cell.model';
import { HttpClientModule } from '@angular/common/http';
import { Charactor } from '../model/celloccupiers/charactor.model';
import { CellOccupier } from '../model/celloccupiers/cell-occupier.model';
import { TreasureChest } from '../model/celloccupiers/treasure-chest.model';
import { Enemy } from '../model/celloccupiers/enemy.model';

describe('MapBuilderService', () => {

  describe('MapBuilderService isolated', () => {
    let httpMock: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
      const service: MapBuilderService = TestBed.get(MapBuilderService);
      expect(service).toBeTruthy();
    });

    describe('getMapGrid', () => {
      let mapGrid: MapGrid;
      const charactor: Charactor = new Charactor(null);
      const enemies: Enemy[] = [];

      beforeEach(async() => {
        const service: MapBuilderService = TestBed.get(MapBuilderService);
        mapGrid = service.getMapGrid(charactor, enemies);
        const mapRequest = httpMock.expectOne('assets/maps/1.map');
        mapRequest.flush('  \nX \nB \nT \nE ');
      });

      it('should return all rows', () => {
        expect(mapGrid.rows.length).toEqual(5);
      });

      it('should return all cells in a row', () => {
        expect(mapGrid.rows[0].cells.length).toEqual(2);
      });

      it('should return a cell', () => {
        expect(mapGrid.rows[0].cells[0]).toEqual(jasmine.any(Cell));
      });

      it('should return a wall cell', () => {
        const cell = mapGrid.rows[1].cells[0];
        expect(cell.occupier).toEqual(jasmine.any(Wall));
      });

      it('should return a treasure chest cell', () => {
        const cell = mapGrid.rows[3].cells[0];
        expect(cell.occupier).toEqual(jasmine.any(TreasureChest));
      });

      it('should return an enemy cell', () => {
        const cell = mapGrid.rows[4].cells[0];
        expect(cell.occupier).toEqual(jasmine.any(Enemy));
        expect(enemies).toContain(<Enemy>cell.occupier);
      });

      it('should assign the charactor to a cell', () => {
        const cell = mapGrid.rows[2].cells[0];
        expect(cell).toEqual(jasmine.any(Cell));
        expect(cell.occupier).toBe(<CellOccupier>charactor);
      });
    });
  });

  describe('MapBuilderService integrated with map files', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule]
      });
    });

    it('should import 1.map', (done) => {
      const service: MapBuilderService = TestBed.get(MapBuilderService);
      const assertionFunction = function(mapGrid) {
        expect(mapGrid.rows[0].cells[0].occupier).toEqual(jasmine.any(Wall));
        done();
      };
      service.getMapGrid(null, [], assertionFunction);
    });
  });
});
