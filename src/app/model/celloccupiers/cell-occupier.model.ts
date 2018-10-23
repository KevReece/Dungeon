import { Cell } from '../cell.model';
import { FactoryService } from 'src/app/services/factory.service';

export class CellOccupier {

    constructor(protected factoryService: FactoryService) { }

    cell: Cell;

    initializeToCell(cell: Cell): void {
        this.cell = cell;
    }

    getCell(): Cell {
        return this.cell;
    }
}
