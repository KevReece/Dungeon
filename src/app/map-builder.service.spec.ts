import { TestBed } from '@angular/core/testing';

import { MapBuilderService } from './map-builder.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { MapGrid } from './model/map-grid.model';
import { Wall } from './model/wall.model';
import { Floor } from './model/floor.model';
import { HttpClientModule } from '@angular/common/http';

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

      beforeEach(async() => {
        const service: MapBuilderService = TestBed.get(MapBuilderService);
        mapGrid = service.getMapGrid();
        let mapRequest = httpMock.expectOne('assets/maps/1.map');
        mapRequest.flush("XX\n X\nXX");
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
      let mapGrid = service.getMapGrid(assertionFunction);
    });
  });
});
