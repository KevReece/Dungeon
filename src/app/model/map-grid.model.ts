import { Row } from './row.model';
import { Direction } from './direction.model';

export class MapGrid {
    constructor(rows: Row[]) {
        this.rows = rows;
        this.setupCells();
    }

    rows: Row[];

    setupCells() {
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
}
