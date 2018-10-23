import { Cell } from '../cell.model';

export class CellOccupier {
    cell: Cell;

    initializeToCell(cell: Cell): void {
        this.cell = cell;
    }

    getCell(): Cell {
        return this.cell;
    }
}
