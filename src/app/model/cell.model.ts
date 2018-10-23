import { CellOccupier } from './cell-occupier.model';
import { Direction } from './direction.model';

export class Cell {

    occupier: CellOccupier;
    adjacentCells: Cell[] = [];

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
