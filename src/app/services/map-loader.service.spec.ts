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
import { Goblin } from '../model/celloccupiers/enemies/goblin.model';
import { Orc } from '../model/celloccupiers/enemies/orc.model';
import { EnemySpawnerService } from './enemy-spawner.service';

describe('MapLoaderService', () => {
  let enemySpawnerService: EnemySpawnerService;

  beforeEach(() => {
    enemySpawnerService = new EnemySpawnerService(null, null);
    spyOn(enemySpawnerService, 'spawnEasy').and.returnValue(TestFactory.createGoblin());
    spyOn(enemySpawnerService, 'spawnHard').and.returnValue(TestFactory.createOrc());
  });

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
      let service: MapLoaderService;
      let mapGrid: MapGrid;
      const character: Character = TestFactory.createCharacter();
      const enemies: Enemy[] = [];

      beforeEach(async() => {
        service = TestBed.get(MapLoaderService);
        mapGrid = TestFactory.createMapGrid([]);
        service.loadMapGrid(1, mapGrid, character, enemies, enemySpawnerService);
        const mapRequest = httpMock.expectOne('assets/maps/0001.map');
        mapRequest.flush('  \nX \nB \nT \nEH\nO ');
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

      it('should return an easy enemy cell', () => {
        const cell = mapGrid.rows[4].cells[0];
        expect(cell.occupier).toEqual(jasmine.any(Enemy));
        expect(enemies).toContain(<Goblin>cell.occupier);
      });

      it('should return a hard enemy cell', () => {
        const cell = mapGrid.rows[4].cells[1];
        expect(cell.occupier).toEqual(jasmine.any(Enemy));
        expect(enemies).toContain(<Orc>cell.occupier);
      });

      it('should return a hole cell', () => {
        const cell = mapGrid.rows[5].cells[0];
        expect(cell.occupier).toEqual(jasmine.any(Hole));
        expect((<Hole>cell.occupier).targetMapLevelNumber).toBe(2);
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

    it('should load 0001.map', (done) => {
      const service: MapLoaderService = TestBed.get(MapLoaderService);
      const mapGrid: MapGrid = TestFactory.createMapGrid([]);
      service.loadMapGrid(1, mapGrid, null, [], enemySpawnerService)
        .then(() => {
          expect(mapGrid.rows[0].cells[0].occupier).toEqual(jasmine.any(Wall));
          expect(mapGrid.rows.length).toBe(40);
          expect(mapGrid.rows[0].cells.length).toBe(40);
          expect(mapGrid.rows[39].cells.length).toBe(40);
          done();
        });
    });

    it('should load 0002.map', (done) => {
      const service: MapLoaderService = TestBed.get(MapLoaderService);
      const mapGrid: MapGrid = TestFactory.createMapGrid([]);
      service.loadMapGrid(2, mapGrid, null, [], enemySpawnerService)
        .then(() => {
          expect(mapGrid.rows[35].cells[24].occupier).toEqual(jasmine.any(Hole));
          expect(mapGrid.rows.length).toBe(40);
          expect(mapGrid.rows[0].cells.length).toBe(40);
          expect(mapGrid.rows[39].cells.length).toBe(40);
          done();
        });
    });

    it('should load 0010.map', (done) => {
      const service: MapLoaderService = TestBed.get(MapLoaderService);
      const mapGrid: MapGrid = TestFactory.createMapGrid([]);
      service.loadMapGrid(10, mapGrid, null, [], enemySpawnerService)
        .then(() => {
          expect(mapGrid.rows[1].cells[1].occupier).toEqual(jasmine.any(Hole));
          expect(mapGrid.rows.length).toBe(40);
          expect(mapGrid.rows[0].cells.length).toBe(40);
          expect(mapGrid.rows[39].cells.length).toBe(40);
          done();
        });
    });
  });
});
