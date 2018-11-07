import { Fighter } from './fighter.model';
import { Direction } from '../direction.model';
import { FactoryService } from 'src/app/services/factory.service';
import { Cell } from '../cell.model';

export class Enemy extends Fighter {
    typeName = 'Goblin';
    health = 2;
    attack = 1;
    defence = 1;
    damage = 1;
    experienceValue = 2;

    constructor(private factoryService: FactoryService) {
        super();
     }

    die(): void {
        this.cell.occupier = null;
    }

    act(): void {
        let cellToMoveTo: Cell;
        const randomChoice = this.factoryService.createRandomInteger(1, 10);

        if (randomChoice <= 4) {
            cellToMoveTo = this.cell.getAdjacentCell(Direction.Up);
        } else if (randomChoice <= 6) {
            cellToMoveTo = this.cell.getAdjacentCell(Direction.Right);
        } else if (randomChoice <= 8) {
            cellToMoveTo = this.cell.getAdjacentCell(Direction.Left);
        } else if (randomChoice <= 9) {
            cellToMoveTo = this.cell.getAdjacentCell(Direction.Down);
        } else {
            cellToMoveTo = null;
        }

        if (cellToMoveTo && !cellToMoveTo.isOccupied()) {
            cellToMoveTo.setOccupier(this);
        }
    }
 }
