import { Cell } from './cell.model';

export interface ICellOccupier {
    initializeToCell(cell: Cell): void;
    getCell(): Cell;
}
