import { TestBed } from '@angular/core/testing';

import { MapBuilderService } from './map-builder.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MapGrid } from './model/map-grid.model';
import { Wall } from './model/wall.model';
import { Floor } from './model/floor.model';
import { HttpClientModule } from '@angular/common/http';
import { Charactor } from './model/charactor.model';

describe('MapBuilderService', () => {
  let httpMock: HttpTestingController;

  describe('MapBuilderService isolated', () => {
    let httpMock: HttpTestingController;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientTestingModule]
      })
      httpMock = TestBed.get(HttpTestingController);
    });

    it('should be created', () => {
      const service: MapBuilderService = TestBed.get(MapBuilderService);
      expect(service).toBeTruthy();
    });

    describe('getMapGrid', () => {
      let mapGrid: MapGrid;
      let charactor: Charactor = new Charactor();

      beforeEach(async() => {
        const service: MapBuilderService = TestBed.get(MapBuilderService);
        mapGrid = service.getMapGrid(charactor);
        let mapRequest = httpMock.expectOne('assets/maps/1.map');
        mapRequest.flush("XX\n X\nBX");
      });

      it('should return all rows', () => {
        expect(mapGrid.rows.length).toEqual(3);
      });
      
      it('should return all cells in a row', () => {
        expect(mapGrid.rows[0].cells.length).toEqual(2);
      });
      
      it('should return a wall cell', () => {
        expect(mapGrid.rows[0].cells[0]).toEqual(jasmine.any(Wall));
      });
      
      it('should return a floor cell', () => {
        expect(mapGrid.rows[1].cells[0]).toEqual(jasmine.any(Floor));
      });
      
      it('should assign the charactor to a cell', () => {
        let cell = mapGrid.rows[2].cells[0];
        expect(cell).toEqual(jasmine.any(Floor));
        expect((<Floor>cell).cellItem).toBe(charactor);
      });
    });
  });

  describe('MapBuilderService integrated with map files', () => {
    
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [HttpClientModule]
      })
    });

    it('should import 1.map', (done) => {
      const service: MapBuilderService = TestBed.get(MapBuilderService);
      let assertionFunction = function(){
        expect(mapGrid.rows[0].cells[0]).toEqual(jasmine.any(Wall));
        done()
      }
      let mapGrid = service.getMapGrid(null, assertionFunction);
    });
  });
});
