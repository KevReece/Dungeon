import { CellOccupier } from './cell-occupier.model';
import { Gold } from '../cellitems/gold.model';
import { FactoryService } from 'src/app/factory.service';
import { UserConsoleService } from 'src/app/user-console.service';

export class TreasureChest extends CellOccupier {

    constructor(protected factoryService: FactoryService, private userConsoleService: UserConsoleService) {
        super(factoryService);
    }

    open() {
        this.cell.occupier = null;
        const droppedGold = new Gold();
        this.cell.items.push(droppedGold);
        this.userConsoleService.writeTreasureChestOpenedAndGoldDropped(droppedGold);
    }
}
