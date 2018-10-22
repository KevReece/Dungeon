import { ICell } from './icell.model';
import { ICellItem } from './icell-item.model';

export class Floor implements ICell {

    cellItem: ICellItem;

    constructor(cellItem?: ICellItem) {
        this.cellItem = cellItem;
    }
}
