import { ICellOccupier } from './i-cell-occupier.model';
import { Cell } from './cell.model';

export class Wall implements ICellOccupier {
    cell: Cell;

    initializeToCell(cell: Cell): void {
        this.cell = cell;
    }

    getCell(): Cell {
        return this.cell;
    }
}
