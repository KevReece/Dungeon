import { CellOccupier } from './cell-occupier.model';
import { Direction } from './direction.model';
import { Cell } from './cell.model';

export class Charactor extends CellOccupier {
    level = 1;
    gold = 0;
    experience = 0;
    health = 10;
    attack = 1;
    defence = 1;

    act(direction: Direction) {
        const adjacentCell = this.cell.getAdjacentCell(direction);
        if (adjacentCell && !adjacentCell.isOccupied()) {
            adjacentCell.setOccupier(this);
        }
    }
}
