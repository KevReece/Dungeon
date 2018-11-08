import { CellOccupier } from './celloccupiers/cell-occupier.model';
import { Direction } from './direction.model';
import { ICellItem } from './cellitems/i-cell-item.model';
import { FactoryService } from '../services/factory.service';

export class Cell {

    occupier: CellOccupier;
    adjacentCells: Cell[] = [];
    items: ICellItem[] = [];
    columnIndex: number;
    rowIndex: number;

    constructor(private factoryService: FactoryService, occupier?: CellOccupier) {
        if (occupier) {
            this.setOccupier(occupier);
        }
    }

    getAdjacentCell(direction: Direction): Cell {
        return this.adjacentCells[direction];
    }

    setOccupier(occupier: CellOccupier) {
        this.occupier = occupier;
        const currectOccupierCell = occupier.getCell();
        if (currectOccupierCell) {
            currectOccupierCell.occupier = null;
        }
        occupier.initializeToCell(this);
    }

    isOccupied() {
        return !!this.occupier;
    }

    isAdjacentCellOccupied(direction: Direction) {
        return !this.getAdjacentCell(direction) || this.getAdjacentCell(direction).isOccupied();
    }

    getDistance(cell: Cell): number {
        return Math.sqrt(Math.pow(cell.columnIndex - this.columnIndex, 2) + Math.pow(cell.rowIndex - this.rowIndex, 2));
    }

    getAngleFromUpTo(cell: Cell): number {
        const angle = Math.atan2(cell.columnIndex - this.columnIndex, this.rowIndex - cell.rowIndex);
        return angle > 0 ? angle : angle < 0 ? Math.PI * 2 + angle : 0;
    }

    getDirectionTo(cell: Cell): Direction {
        const rowDifference = cell.rowIndex - this.rowIndex;
        const columnDifference = cell.columnIndex - this.columnIndex;
        const columnDirection = (rowDifference >= 0 ? Direction.Down : Direction.Up);
        const rowDirection = (columnDifference >= 0 ? Direction.Right : Direction.Left);
        if (Math.abs(rowDifference) === Math.abs(columnDifference)) {
            return this.factoryService.createRandomInteger(0, 1) === 0 ? rowDirection : columnDirection;
        }
        return Math.abs(rowDifference) > Math.abs(columnDifference) ? columnDirection : rowDirection;
    }
}
