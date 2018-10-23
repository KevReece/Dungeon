import { CellOccupier } from './cell-occupier.model';
import { Gold } from './gold.model';

export class TreasureChest extends CellOccupier {
    open() {
        this.cell.occupier = null;
        this.cell.items.push(new Gold());
    }
}
