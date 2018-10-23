import { TestBed } from '@angular/core/testing';

import { MapBuilderService } from './map-builder.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MapGrid } from './model/map-grid.model';
import { Wall } from './model/wall.model';
import { Cell } from './model/cell.model';
import { HttpClientModule } from '@angular/common/http';
import { Charactor } from './model/charactor.model';
import { ICellOccupier } from './model/i-cell-occupier.model';

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
      const charactor: Charactor = new Charactor();

      beforeEach(async() => {
        const service: MapBuilderService = TestBed.get(MapBuilderService);
        mapGrid = service.getMapGrid(charactor);
        const mapRequest = httpMock.expectOne('assets/maps/1.map');
        mapRequest.flush('  \nX \nB ');
      });

      it('should return all rows', () => {
        expect(mapGrid.rows.length).toEqual(3);
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

      it('should assign the charactor to a cell', () => {
        const cell = mapGrid.rows[2].cells[0];
        expect(cell).toEqual(jasmine.any(Cell));
        expect(cell.occupier).toBe(<ICellOccupier>charactor);
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
      service.getMapGrid(null, assertionFunction);
    });
  });
});
