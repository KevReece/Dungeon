import { ICellItem } from './i-cell-item.model';
import { FactoryService } from 'src/app/services/factory.service';

export class Gold implements ICellItem {
    quantity: number;

    constructor(factoryService: FactoryService) {
        const quantityMultipleOf = 10;
        this.quantity = factoryService.createRandomNumber(1, 10) * quantityMultipleOf;
    }
}
