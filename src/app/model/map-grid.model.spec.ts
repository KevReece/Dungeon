import { MapGrid } from './map-grid.model';
import { Row } from './row.model';
import { Cell } from './cell.model';
import { Direction } from './direction.model';

describe('MapGrid', () => {
    describe('constructor', () => {
        it('should call setAdjacentCells', () => {
            const sourceCell = new Cell();
            const rightCell = new Cell();

            const mapGrid = new MapGrid([new Row([sourceCell, rightCell])]);

            expect(sourceCell.getAdjacentCell(Direction.Right)).toBe(rightCell);
        });
    });

    describe('setAdjacentCells', () => {
        it('should set cell directions', () => {
            const mapGrid = new MapGrid([]);
            const sourceCell = new Cell();
            const upCell = new Cell();
            const rightCell = new Cell();
            const downCell = new Cell();
            const leftCell = new Cell();
            const rows = [
                new Row([new Cell(), upCell, new Cell()]),
                new Row([leftCell, sourceCell, rightCell]),
                new Row([new Cell(), downCell, new Cell()])
            ];
            mapGrid.rows = rows;

            mapGrid.setAdjacentCells();

            expect(sourceCell.getAdjacentCell(Direction.Up)).toBe(upCell);
            expect(sourceCell.getAdjacentCell(Direction.Right)).toBe(rightCell);
            expect(sourceCell.getAdjacentCell(Direction.Down)).toBe(downCell);
            expect(sourceCell.getAdjacentCell(Direction.Left)).toBe(leftCell);
        });

        it('should leave adjacent cells as undefined when not there', () => {
            const mapGrid = new MapGrid([]);
            const sourceCell = new Cell();
            mapGrid.rows = [new Row([sourceCell])];

            mapGrid.setAdjacentCells();

            expect(sourceCell.getAdjacentCell(Direction.Up)).toBeUndefined();
            expect(sourceCell.getAdjacentCell(Direction.Right)).toBeUndefined();
            expect(sourceCell.getAdjacentCell(Direction.Down)).toBeUndefined();
            expect(sourceCell.getAdjacentCell(Direction.Left)).toBeUndefined();
        });
    });
});
