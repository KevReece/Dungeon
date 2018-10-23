import { ICellOccupier } from './i-cell-occupier.model';
import { Direction } from './direction.model';

export class Cell {

    occupier: ICellOccupier;
    adjacentCells: Cell[] = [];

    constructor(occupier?: ICellOccupier) {
        if (occupier) {
            this.setOccupier(occupier);
        }
    }

    getAdjacentCell(direction: Direction): Cell {
        return this.adjacentCells[direction];
    }

    setOccupier(occupier: ICellOccupier) {
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
