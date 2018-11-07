import { Fighter } from './fighter.model';
import { Direction } from '../direction.model';
import { FactoryService } from 'src/app/services/factory.service';
import { Cell } from '../cell.model';
import { DirectionHelper } from '../direction-helper';

export class Enemy extends Fighter {
    typeName = 'Goblin';
    health = 2;
    attack = 1;
    defence = 1;
    damage = 1;
    experienceValue = 2;
    direction: Direction;

    constructor(private factoryService: FactoryService) {
        super();
        this.direction = factoryService.createRandomInteger(Direction.Up, Direction.Left);
     }

    die(): void {
        this.cell.occupier = null;
    }

    act(): void {
        const randomChoice = this.factoryService.createRandomInteger(1, 10);
        let directionToMoveIn: Direction = null;
        if (randomChoice <= 4) {
            directionToMoveIn = this.direction;
        } else if (randomChoice <= 6) {
            directionToMoveIn = DirectionHelper.RotateRight(this.direction);
        } else if (randomChoice <= 8) {
            directionToMoveIn = DirectionHelper.RotateLeft(this.direction);
        } else if (randomChoice <= 9) {
            directionToMoveIn = DirectionHelper.Opposite(this.direction);
        }

        let cellToMoveTo: Cell;
        if (directionToMoveIn != null) {
            cellToMoveTo = this.cell.getAdjacentCell(directionToMoveIn);
        }

        if (cellToMoveTo && !cellToMoveTo.isOccupied()) {
            cellToMoveTo.setOccupier(this);
            this.direction = directionToMoveIn;
        }
    }
 }
