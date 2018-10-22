import { ICell } from './icell.model';

export class Row {
    constructor(cells: ICell[]) {
        this.cells = cells;
    }
    cells: ICell[];
}
