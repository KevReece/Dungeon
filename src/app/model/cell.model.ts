import { CellOccupier } from './cell-occupier.model';
import { Direction } from './direction.model';
import { ICellItem } from './i-cell-item.model';

export class Cell {

    occupier: CellOccupier;
    adjacentCells: Cell[] = [];
    items: ICellItem[] = [];

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
}
