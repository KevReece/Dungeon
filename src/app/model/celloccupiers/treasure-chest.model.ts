import { CellOccupier } from './cell-occupier.model';
import { Gold } from '../cellitems/gold.model';
import { UserConsoleService } from 'src/app/services/user-console.service';

export class TreasureChest extends CellOccupier {

    constructor(private userConsoleService: UserConsoleService) {
        super();
    }

    open() {
        this.cell.occupier = null;
        const droppedGold = new Gold();
        this.cell.items.push(droppedGold);
        this.userConsoleService.writeTreasureChestOpenedAndGoldDropped(droppedGold);
    }
}
