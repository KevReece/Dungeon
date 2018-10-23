import { CellOccupier } from './cell-occupier.model';
import { Direction } from '../direction.model';
import { TreasureChest } from './treasure-chest.model';

export class Charactor extends CellOccupier {
    level = 1;
    gold = 0;
    experience = 0;
    health = 10;
    attack = 1;
    defence = 1;

    act(direction: Direction) {
        const adjacentCell = this.cell.getAdjacentCell(direction);
        if (adjacentCell) {
            if (!adjacentCell.isOccupied()) {
                adjacentCell.setOccupier(this);
            } else if (adjacentCell.occupier instanceof TreasureChest) {
                (<TreasureChest>adjacentCell.occupier).open();
            }
        }
    }
}
