import { Cell } from './cell.model';
import { Wall } from './celloccupiers/wall.model';
import { MapGrid } from './map-grid.model';
import { Row } from './row.model';
import { TestFactory } from '../testhelpers/test-factory';

describe('Cell', () => {
    describe('constructor', () => {
        it('should construct without cell item', () => {
            expect(new Cell()).toBeTruthy();
        });

        it('should call set occupier', () => {
            const character = TestFactory.createCharacter();

            const cell = new Cell(character);

            expect(cell.occupier).toBe(character);
        });
    });

    describe('setOccupier', () => {

        it('should set cell occupier', () => {
            const character = TestFactory.createCharacter();

            const cell = new Cell(character);

            expect(cell.occupier).toBe(character);
        });

        it('should initialize the cell occupier', () => {
            const character = TestFactory.createCharacter();
            spyOn(character, 'initializeToCell');

            const cell = new Cell(character);

            expect(character.initializeToCell).toHaveBeenCalledWith(cell);
        });

        it('should clear previous cell of occupier', () => {
            const character = TestFactory.createCharacter();
            const previousCell = new Cell(character);

            const newCell = new Cell(character);

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
