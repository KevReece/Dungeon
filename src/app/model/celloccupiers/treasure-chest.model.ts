import { CellOccupier } from './cell-occupier.model';
import { UserConsoleService } from 'src/app/services/user-console.service';
import { FactoryService } from 'src/app/services/factory.service';

export class TreasureChest extends CellOccupier {

    constructor(private userConsoleService: UserConsoleService, private factoryService: FactoryService) {
        super();
    }

    open() {
        this.cell.occupier = null;
        if (this.factoryService.createRandomInteger(1, 4) <= 3) {
            const droppedGold = this.factoryService.createGold();
            this.cell.items.push(droppedGold);
            this.userConsoleService.writeTreasureChestOpenedAndGoldDropped(droppedGold);
        } else {
            const droppedFood = this.factoryService.createFood();
            this.cell.items.push(droppedFood);
            this.userConsoleService.writeTreasureChestOpenedAndFoodDropped();
        }
    }
}
