import { MapGrid } from './map-grid.model';
import { Row } from './row.model';
import { Cell } from './cell.model';
import { Direction } from './direction.model';
import { TestFactory } from '../testhelpers/test-factory';
import { FactoryService } from '../services/factory.service';

describe('MapGrid', () => {
    describe('constructor', () => {
        it('should call setupCells', () => {
            const sourceCell = TestFactory.createCell();
            const rightCell = TestFactory.createCell();

            const mapGrid = new MapGrid(null, [new Row([sourceCell, rightCell])]);

            expect(sourceCell.getAdjacentCell(Direction.Right)).toBe(rightCell);
        });
    });

    describe('setupCells', () => {
        it('should set cell directions', () => {
            const mapGrid = new MapGrid(null, []);
            const sourceCell = TestFactory.createCell();
            const upCell = TestFactory.createCell();
            const rightCell = TestFactory.createCell();
            const downCell = TestFactory.createCell();
            const leftCell = TestFactory.createCell();
            const rows = [
                new Row([TestFactory.createCell(), upCell, TestFactory.createCell()]),
                new Row([leftCell, sourceCell, rightCell]),
                new Row([TestFactory.createCell(), downCell, TestFactory.createCell()])
            ];
            mapGrid.rows = rows;

            mapGrid.setupCells();

            expect(sourceCell.getAdjacentCell(Direction.Up)).toBe(upCell);
            expect(sourceCell.getAdjacentCell(Direction.Right)).toBe(rightCell);
            expect(sourceCell.getAdjacentCell(Direction.Down)).toBe(downCell);
            expect(sourceCell.getAdjacentCell(Direction.Left)).toBe(leftCell);
        });

        it('should leave adjacent cells as undefined when not there', () => {
            const mapGrid = new MapGrid(null, []);
            const sourceCell = TestFactory.createCell();
            mapGrid.rows = [new Row([sourceCell])];

            mapGrid.setupCells();

            expect(sourceCell.getAdjacentCell(Direction.Up)).toBeUndefined();
            expect(sourceCell.getAdjacentCell(Direction.Right)).toBeUndefined();
            expect(sourceCell.getAdjacentCell(Direction.Down)).toBeUndefined();
            expect(sourceCell.getAdjacentCell(Direction.Left)).toBeUndefined();
        });

        it('should set cell indexes', () => {
            const mapGrid = new MapGrid(null, []);
            const sourceCell = TestFactory.createCell();
            const rows = [
                new Row([TestFactory.createCell(), TestFactory.createCell()]),
                new Row([TestFactory.createCell(), TestFactory.createCell()]),
                new Row([TestFactory.createCell(), sourceCell])
            ];
            mapGrid.rows = rows;

            mapGrid.setupCells();

            expect(sourceCell.columnIndex).toEqual(1);
            expect(sourceCell.rowIndex).toEqual(2);
        });
    });

    describe('randomUnoccupiedCell', () => {
        const mockFactoryService = new FactoryService();
        
        it('should return null for empty grid', () => {
            const mapGrid = new MapGrid(mockFactoryService, []);

            const cell = mapGrid.randomUnoccupiedCell();

            expect(cell).toBeNull();
        });
        
        it('should return single for single cell grid', () => {
            const mapGrid = TestFactory.create1x1MapGrid(null, mockFactoryService);
            spyOn(mockFactoryService, 'createRandomInteger').and.returnValue(0);

            const cell = mapGrid.randomUnoccupiedCell();

            expect(cell).toBe(mapGrid.rows[0].cells[0]);
            expect(mockFactoryService.createRandomInteger).toHaveBeenCalledWith(0, 0);
        });
        
        it('should return random from row', () => {
            const mapGrid = TestFactory.create9x9MapGrid(null, mockFactoryService);
            spyOn(mockFactoryService, 'createRandomInteger').and.returnValue(1);

            const cell = mapGrid.randomUnoccupiedCell();

            expect(cell).toBe(mapGrid.rows[0].cells[1]);
            expect(mockFactoryService.createRandomInteger).toHaveBeenCalledWith(0, 8);
        });
        
        it('should return random from grid', () => {
            const mapGrid = TestFactory.create9x9MapGrid(null, mockFactoryService);
            spyOn(mockFactoryService, 'createRandomInteger').and.returnValue(4);

            const cell = mapGrid.randomUnoccupiedCell();

            expect(cell).toBe(mapGrid.rows[1].cells[1]);
        });
        
        
        it('should return randmom as last from grid', () => {
            const mapGrid = TestFactory.create9x9MapGrid(null, mockFactoryService);
            spyOn(mockFactoryService, 'createRandomInteger').and.returnValue(8);

            const cell = mapGrid.randomUnoccupiedCell();

            expect(cell).toBe(mapGrid.rows[2].cells[2]);
        });
        
        it('should return null for occupied grid', () => {
            const mapGrid = TestFactory.create1x1MapGrid(TestFactory.createCharacter(), mockFactoryService);

            const cell = mapGrid.randomUnoccupiedCell();

            expect(cell).toBeNull();
        });
        
        it('should skip occupied cells', () => {
            const mapGrid = TestFactory.create9x9MapGrid(TestFactory.createCharacter(), mockFactoryService);
            spyOn(mockFactoryService, 'createRandomInteger').and.returnValue(4);

            const cell = mapGrid.randomUnoccupiedCell();

            expect(cell).toBe(mapGrid.rows[1].cells[2]);
            expect(mockFactoryService.createRandomInteger).toHaveBeenCalledWith(0, 7)
        });
    });
});
