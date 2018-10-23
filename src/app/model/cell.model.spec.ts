import { Cell } from './cell.model';
import { Charactor } from './celloccupiers/charactor.model';
import { Wall } from './celloccupiers/wall.model';
import { MapGrid } from './map-grid.model';
import { Row } from './row.model';

describe('Cell', () => {
    describe('constructor', () => {
        it('should construct without cell item', () => {
            expect(new Cell()).toBeTruthy();
        });

        it('should call set occupier', () => {
            const charactor = new Charactor(null);

            const cell = new Cell(charactor);

            expect(cell.occupier).toBe(charactor);
        });
    });

    describe('setOccupier', () => {

        it('should set cell occupier', () => {
            const charactor = new Charactor(null);

            const cell = new Cell(charactor);

            expect(cell.occupier).toBe(charactor);
        });

        it('should initialize the cell occupier', () => {
            const charactor = new Charactor(null);
            spyOn(charactor, 'initializeToCell');

            const cell = new Cell(charactor);

            expect(charactor.initializeToCell).toHaveBeenCalledWith(cell);
        });

        it('should clear previous cell of occupier', () => {
            const charactor = new Charactor(null);
            const previousCell = new Cell(charactor);

            const newCell = new Cell(charactor);

            expect(previousCell.occupier).toBeNull();
        });
    });

    describe('isOccupied', () => {
        it('should not be occupied', () => {
            expect(new Cell().isOccupied()).toBeFalsy();
        });

        it('should be occupied', () => {
            expect(new Cell(new Wall()).isOccupied()).toBeTruthy();
        });
    });

    describe('getDistance', () => {
        it('should get the distance as 1 for neighbour', () => {
            const cell = new Cell();
            const otherCell = new Cell();
            const mapGrid = new MapGrid([new Row([cell, otherCell])]);

            const distance = cell.getDistance(otherCell);

            expect(distance).toEqual(1);
        });

        it('should get the distance as 1.414 for diagonal neighbour', () => {
            const cell = new Cell();
            const otherCell = new Cell();
            const mapGrid = new MapGrid([new Row([cell, new Cell()]), new Row([new Cell(), otherCell])]);

            const distance = cell.getDistance(otherCell);

            expect(distance).toEqual(Math.SQRT2);
        });
    });

    describe('getAngleFromUpTo', () => {
        it('should get the angle as zero for above', () => {
            const cell = new Cell();
            const otherCell = new Cell();
            const mapGrid = new MapGrid([new Row([otherCell]), new Row([cell])]);

            const angle = cell.getAngleFromUpTo(otherCell);

            expect(angle).toEqual(0);
        });

        it('should get the angle as half Pi for right', () => {
            const cell = new Cell();
            const otherCell = new Cell();
            const mapGrid = new MapGrid([new Row([cell, otherCell])]);

            const angle = cell.getAngleFromUpTo(otherCell);

            expect(angle).toEqual(Math.PI / 2);
        });

        it('should get the angle as Pi for below', () => {
            const cell = new Cell();
            const otherCell = new Cell();
            const mapGrid = new MapGrid([new Row([cell]), new Row([otherCell])]);

            const angle = cell.getAngleFromUpTo(otherCell);
            console.log('angle again' + angle);
            expect(angle).toEqual(Math.PI);
        });

        it('should get the angle as 1.5 Pi for left', () => {
            const cell = new Cell();
            const otherCell = new Cell();
            const mapGrid = new MapGrid([new Row([otherCell, cell])]);

            const angle = cell.getAngleFromUpTo(otherCell);

            expect(angle).toEqual(3 * Math.PI / 2);
        });
    });
});
