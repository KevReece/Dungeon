import { Cell } from './cell.model';
import { Wall } from './celloccupiers/wall.model';
import { MapGrid } from './map-grid.model';
import { Row } from './row.model';
import { TestFactory } from '../testhelpers/test-factory';
import { Direction } from './direction.model';
import { FactoryService } from '../services/factory.service';

describe('Cell', () => {
    let factoryService: FactoryService;

    beforeEach(() => {
        factoryService = new FactoryService();
    });

    describe('constructor', () => {
        it('should construct without cell item', () => {
            expect(new Cell(factoryService)).toBeTruthy();
        });

        it('should call set occupier', () => {
            const character = TestFactory.createCharacter();

            const cell = new Cell(factoryService, character);

            expect(cell.occupier).toBe(character);
        });
    });

    describe('setOccupier', () => {

        it('should set cell occupier', () => {
            const character = TestFactory.createCharacter();

            const cell = new Cell(factoryService, character);

            expect(cell.occupier).toBe(character);
        });

        it('should initialize the cell occupier', () => {
            const character = TestFactory.createCharacter();
            spyOn(character, 'initializeToCell');

            const cell = new Cell(factoryService, character);

            expect(character.initializeToCell).toHaveBeenCalledWith(cell);
        });

        it('should clear previous cell of occupier', () => {
            const character = TestFactory.createCharacter();
            const previousCell = new Cell(factoryService, character);

            const newCell = new Cell(factoryService, character);

            expect(previousCell.occupier).toBeNull();
        });
    });

    describe('isOccupied', () => {
        it('should not be occupied', () => {
            expect(new Cell(factoryService).isOccupied()).toBeFalsy();
        });

        it('should be occupied', () => {
            expect(new Cell(factoryService, new Wall()).isOccupied()).toBeTruthy();
        });
    });

    describe('isAdjacentCellOccupied', () => {
        it('should be occupied when none', () => {
            const cell = new Cell(factoryService);
            cell.adjacentCells[Direction.Right] = new Cell(factoryService);
            expect(cell.isAdjacentCellOccupied(Direction.Left)).toBeTruthy();
        });

        it('should not be occupied', () => {
            const cell = new Cell(factoryService);
            cell.adjacentCells[Direction.Left] = new Cell(factoryService);
            expect(cell.isAdjacentCellOccupied(Direction.Left)).toBeFalsy();
        });

        it('should be occupied', () => {
            const cell = new Cell(factoryService);
            cell.adjacentCells[Direction.Left] = new Cell(factoryService, new Wall());
            expect(cell.isAdjacentCellOccupied(Direction.Left)).toBeTruthy();
        });
    });

    describe('getDistance', () => {
        it('should get the distance as 1 for neighbour', () => {
            const cell = new Cell(factoryService);
            const otherCell = new Cell(factoryService);
            const mapGrid = new MapGrid([new Row([cell, otherCell])]);

            const distance = cell.getDistance(otherCell);

            expect(distance).toEqual(1);
        });

        it('should get the distance as 1.414 for diagonal neighbour', () => {
            const cell = new Cell(factoryService);
            const otherCell = new Cell(factoryService);
            const mapGrid = new MapGrid([new Row([cell, new Cell(factoryService)]), new Row([new Cell(factoryService), otherCell])]);

            const distance = cell.getDistance(otherCell);

            expect(distance).toEqual(Math.SQRT2);
        });
    });

    describe('getAngleFromUpTo', () => {
        it('should get the angle as zero for above', () => {
            const cell = new Cell(factoryService);
            const otherCell = new Cell(factoryService);
            const mapGrid = new MapGrid([new Row([otherCell]), new Row([cell])]);

            const angle = cell.getAngleFromUpTo(otherCell);

            expect(angle).toEqual(0);
        });

        it('should get the angle as half Pi for right', () => {
            const cell = new Cell(factoryService);
            const otherCell = new Cell(factoryService);
            const mapGrid = new MapGrid([new Row([cell, otherCell])]);

            const angle = cell.getAngleFromUpTo(otherCell);

            expect(angle).toEqual(Math.PI / 2);
        });

        it('should get the angle as Pi for below', () => {
            const cell = new Cell(factoryService);
            const otherCell = new Cell(factoryService);
            const mapGrid = new MapGrid([new Row([cell]), new Row([otherCell])]);

            const angle = cell.getAngleFromUpTo(otherCell);

            expect(angle).toEqual(Math.PI);
        });

        it('should get the angle as 1.5 Pi for left', () => {
            const cell = new Cell(factoryService);
            const otherCell = new Cell(factoryService);
            const mapGrid = new MapGrid([new Row([otherCell, cell])]);

            const angle = cell.getAngleFromUpTo(otherCell);

            expect(angle).toEqual(3 * Math.PI / 2);
        });
    });

    describe('getDirectionTo', () => {

        it('should get the direction as up', () => {
            const cell = new Cell(factoryService);
            const otherCell = new Cell(factoryService);
            const mapGrid = new MapGrid([new Row([otherCell]), new Row([cell])]);

            const direction = cell.getDirectionTo(otherCell);

            expect(direction).toEqual(Direction.Up);
        });

        it('should get the direction as right', () => {
            const cell = new Cell(factoryService);
            const otherCell = new Cell(factoryService);
            const mapGrid = new MapGrid([new Row([cell, otherCell])]);

            const direction = cell.getDirectionTo(otherCell);

            expect(direction).toEqual(Direction.Right);
        });

        it('should get the direction as down', () => {
            const cell = new Cell(factoryService);
            const otherCell = new Cell(factoryService);
            const mapGrid = new MapGrid([new Row([cell]), new Row([otherCell])]);

            const direction = cell.getDirectionTo(otherCell);

            expect(direction).toEqual(Direction.Down);
        });

        it('should get the direction as left', () => {
            const cell = new Cell(factoryService);
            const otherCell = new Cell(factoryService);
            const mapGrid = new MapGrid([new Row([otherCell, cell])]);

            const direction = cell.getDirectionTo(otherCell);

            expect(direction).toEqual(Direction.Left);
        });

        it('should get the direction as right when close', () => {
            const cell = new Cell(factoryService);
            const otherCell = new Cell(factoryService);
            const mapGrid = new MapGrid([new Row([cell, new Cell(factoryService), new Cell(factoryService)]),
                                        new Row([new Cell(factoryService), new Cell(factoryService), otherCell])]);

            const direction = cell.getDirectionTo(otherCell);

            expect(direction).toEqual(Direction.Right);
        });

        it('should be random when the direction is between two directions', () => {
            const cell = new Cell(factoryService);
            const otherCell = new Cell(factoryService);
            const mapGrid = new MapGrid([new Row([cell, new Cell(factoryService)]), new Row([new Cell(factoryService), otherCell])]);
            spyOn(factoryService, 'createRandomInteger').and.returnValue(1);

            const direction = cell.getDirectionTo(otherCell);

            expect(direction).toEqual(Direction.Down);
            expect(factoryService.createRandomInteger).toHaveBeenCalledWith(0, 1);
        });

        it('should be random the other way when the direction is between two directions', () => {
            const cell = new Cell(factoryService);
            const otherCell = new Cell(factoryService);
            const mapGrid = new MapGrid([new Row([cell, new Cell(factoryService)]), new Row([new Cell(factoryService), otherCell])]);
            spyOn(factoryService, 'createRandomInteger').and.returnValue(0);

            const direction = cell.getDirectionTo(otherCell);

            expect(direction).toEqual(Direction.Right);
            expect(factoryService.createRandomInteger).toHaveBeenCalledWith(0, 1);
        });
    });
});
