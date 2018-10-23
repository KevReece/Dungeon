import { CellOccupier } from './cell-occupier.model';

export class TreasureChest extends CellOccupier {
    open() {
        this.cell.occupier = null;
    }
}
