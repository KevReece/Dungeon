import { TestBed } from '@angular/core/testing';

import { MapLoaderService } from './map-loader.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MapGrid } from '../model/map-grid.model';
import { Wall } from '../model/celloccupiers/wall.model';
import { Cell } from '../model/cell.model';
import { HttpClientModule } from '@angular/common/http';
import { Character } from '../model/celloccupiers/character.model';
import { CellOccupier } from '../model/celloccupiers/cell-occupier.model';
import { TreasureChest } from '../model/celloccupiers/treasure-chest.model';
import { Enemy } from '../model/celloccupiers/enemy.model';
import { TestFactory } from '../testhelpers/test-factory';
import { Hole } from '../model/celloccupiers/hole.model';

describe('MapLoadderService', () => {

  describe('isolated', () => {
    let httpMock: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      });
      httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
      const service: MapLoaderService = TestBed.get(MapLoaderService);
      expect(service).toBeTruthy();
    });

    describe('getMapGrid', () => {
      let mapGrid: MapGrid;
      const character: Character = TestFactory.createCharacter();
      const enemies: Enemy[] = [];

      beforeEach(async() => {
        const service: MapLoaderService = TestBed.get(MapLoaderService);
        mapGrid = new MapGrid([]);
        service.loadMapGrid(mapGrid, character, enemies);
        const mapRequest = httpMock.expectOne('assets/maps/1.map');
        mapRequest.flush('  \nX \nB \nT \nE \nO ');
      });

      it('should return all rows', () => {
        expect(mapGrid.rows.length).toEqual(6);
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

      it('should return a hole cell', () => {
        const cell = mapGrid.rows[5].cells[0];
        expect(cell.occupier).toEqual(jasmine.any(Hole));
      });

      it('should assign the character to a cell', () => {
        const cell = mapGrid.rows[2].cells[0];
        expect(cell).toEqual(jasmine.any(Cell));
        expect(cell.occupier).toBe(<CellOccupier>character);
      });
    });
  });

  describe('integrated with map files', () => {

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule]
      });
    });

    it('should load 1.map', (done) => {
      const service: MapLoaderService = TestBed.get(MapLoaderService);
      const mapGrid: MapGrid = new MapGrid([]);
      service.loadMapGrid(mapGrid, null, [])
        .then(() => {
          expect(mapGrid.rows[0].cells[0].occupier).toEqual(jasmine.any(Wall));
          expect(mapGrid.rows.length).toBe(40);
          expect(mapGrid.rows[0].cells.length).toBe(40);
          expect(mapGrid.rows[39].cells.length).toBe(40);
          done();
        });
    });
  });
});
