import { ICellItem } from './i-cell-item.model';
import { FactoryService } from 'src/app/services/factory.service';
import { Character } from '../celloccupiers/character.model';

export class Gold implements ICellItem {
    quantity: number;

    constructor(factoryService: FactoryService) {
        const quantityMultipleOf = 10;
        this.quantity = factoryService.createRandomInteger(1, 10) * quantityMultipleOf;
    }

    collect(character: Character): void {
        character.gold += this.quantity;
    }
}
