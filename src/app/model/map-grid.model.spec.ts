import { MapGrid } from './map-grid.model';
import { Row } from './row.model';
import { Cell } from './cell.model';
import { Direction } from './direction.model';
import { TestFactory } from '../testhelpers/test-factory';

describe('MapGrid', () => {
    describe('constructor', () => {
        it('should call setupCells', () => {
            const sourceCell = TestFactory.createCell();
            const rightCell = TestFactory.createCell();

            const mapGrid = new MapGrid([new Row([sourceCell, rightCell])]);

            expect(sourceCell.getAdjacentCell(Direction.Right)).toBe(rightCell);
        });
    });

    describe('setupCells', () => {
        it('should set cell directions', () => {
            const mapGrid = new MapGrid([]);
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
            const mapGrid = new MapGrid([]);
            const sourceCell = TestFactory.createCell();
            mapGrid.rows = [new Row([sourceCell])];

            mapGrid.setupCells();

            expect(sourceCell.getAdjacentCell(Direction.Up)).toBeUndefined();
            expect(sourceCell.getAdjacentCell(Direction.Right)).toBeUndefined();
            expect(sourceCell.getAdjacentCell(Direction.Down)).toBeUndefined();
            expect(sourceCell.getAdjacentCell(Direction.Left)).toBeUndefined();
        });

        it('should set cell indexes', () => {
            const mapGrid = new MapGrid([]);
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
});
