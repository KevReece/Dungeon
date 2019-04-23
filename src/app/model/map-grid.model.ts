import { Row } from './row.model';
import { Direction } from './direction.model';
import { Cell } from './cell.model';
import { FactoryService } from '../services/factory.service';

export class MapGrid {
    constructor(private factoryService: FactoryService, rows: Row[]) {
        this.rows = rows;
        this.setupCells();
    }

    rows: Row[];

    setupCells(): void {
        for (let rowIndex = 0; rowIndex < this.rows.length; rowIndex++) {
            const row = this.rows[rowIndex];
            for (let columnIndex = 0; columnIndex < row.cells.length; columnIndex++) {
                const cell = row.cells[columnIndex];
                cell.columnIndex = columnIndex;
                cell.rowIndex = rowIndex;
                if (rowIndex - 1 >= 0) {
                    cell.adjacentCells[Direction.Up] = this.rows[rowIndex - 1].cells[columnIndex];
                }
                if (columnIndex + 1 < row.cells.length) {
                    cell.adjacentCells[Direction.Right] = row.cells[columnIndex + 1];
                }
                if (rowIndex + 1 <  this.rows.length) {
                    cell.adjacentCells[Direction.Down] = this.rows[rowIndex + 1].cells[columnIndex];
                }
                if (columnIndex - 1 >= 0) {
                    cell.adjacentCells[Direction.Left] = row.cells[columnIndex - 1];
                }
            }
        }
    }

    randomUnoccupiedCell(): Cell {
        let unoccupiedCells = this.getUnoccupiedCells();
        if (unoccupiedCells.length === 0) {
            return null;
        }
        return unoccupiedCells[this.factoryService.createRandomInteger(0, unoccupiedCells.length - 1)];
    }

    private getUnoccupiedCells(): Cell[] {
        let unoccupiedCells = []
        for (let rowIndex = 0; rowIndex < this.rows.length; rowIndex++) {
            const row = this.rows[rowIndex];
            for (let columnIndex = 0; columnIndex < row.cells.length; columnIndex++) {
                const cell = row.cells[columnIndex];
                if (!cell.isOccupied()) {
                    unoccupiedCells.push(cell);
                }
            }
        }
        return unoccupiedCells;
    }
}
