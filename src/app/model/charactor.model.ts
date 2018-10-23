import { ICellOccupier } from './i-cell-occupier.model';
import { Direction } from './direction.model';
import { Cell } from './cell.model';

export class Charactor implements ICellOccupier {
    level = 1;
    gold = 0;
    experience = 0;
    health = 10;
    attack = 1;
    defence = 1;
    cell: Cell;

    initializeToCell(cell: Cell) {
        this.cell = cell;
    }

    getCell() {
        return this.cell;
    }

    act(direction: Direction) {
        const adjacentCell = this.cell.getAdjacentCell(direction);
        if (adjacentCell) {
            adjacentCell.setOccupier(this);
        }
    }
}
