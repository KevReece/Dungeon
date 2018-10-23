import { ICellItem } from './i-cell-item.model';

export class Gold implements ICellItem {
    quantity: number;

    constructor(){
        const quantityMultipleOf = 10;
        const minimumQuantity = 10;
        const maximumQuantity = 100;
        this.quantity = Math.floor(((Math.random() * maximumQuantity) + minimumQuantity) / quantityMultipleOf) * quantityMultipleOf;
    }
}
