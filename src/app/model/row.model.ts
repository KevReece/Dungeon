import { Cell } from './cell.model';

export class Row {
    constructor(cells: Cell[]) {
        this.cells = cells;
    }
    cells: Cell[];
}
