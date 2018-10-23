import { CellOccupier } from './celloccupiers/cell-occupier.model';
import { Direction } from './direction.model';
import { ICellItem } from './cellitems/i-cell-item.model';

export class Cell {

    occupier: CellOccupier;
    adjacentCells: Cell[] = [];
    items: ICellItem[] = [];
    columnIndex: number;
    rowIndex: number;

    constructor(occupier?: CellOccupier) {
        if (occupier) {
            this.setOccupier(occupier);
        }
    }

    getAdjacentCell(direction: Direction): Cell {
        return this.adjacentCells[direction];
    }

    setOccupier(occupier: CellOccupier) {
        this.occupier = occupier;
        const currectOccupierCell = occupier.getCell();
        if (currectOccupierCell) {
            currectOccupierCell.occupier = null;
        }
        occupier.initializeToCell(this);
    }

    isOccupied() {
        return !!this.occupier;
    }

    getDistance(cell: Cell): number {
        return Math.sqrt(Math.pow(cell.columnIndex - this.columnIndex, 2) + Math.pow(cell.rowIndex - this.rowIndex, 2));
    }

    getAngleFromUpTo(cell: Cell): number {
        const angle = Math.atan2(cell.columnIndex - this.columnIndex, this.rowIndex - cell.rowIndex);
        return angle > 0 ? angle : angle < 0 ? Math.PI * 2 + angle : 0;
    }
}
