import { Fighter } from './fighter.model';
import { Direction } from '../direction.model';
import { FactoryService } from 'src/app/services/factory.service';
import { Cell } from '../cell.model';
import { DirectionHelper } from '../direction-helper';
import { Character } from './character.model';

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

    turnRightDirection(): Direction {
        return DirectionHelper.rotateRight(this.direction);
    }

    turnLeftDirection(): Direction {
        return DirectionHelper.rotateLeft(this.direction);
    }

    backDirection(): Direction {
        return DirectionHelper.opposite(this.direction);
    }

    act(character: Character): void {
        let directionToMoveIn: Direction;
        const awarenessDistance = 10;
        if (this.cell.getDistance(character.cell) <= awarenessDistance) {
            directionToMoveIn = this.cell.getDirectionTo(character.cell);
        } else {
            directionToMoveIn = this.wanderDirection();
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

    private wanderDirection() {
        const weightedOptions = this.factoryService.createWeightedOptions();
        if (!this.cell.isAdjacentCellOccupied(this.direction)) {
            weightedOptions.add(this.direction, 6);
        }
        if (!this.cell.isAdjacentCellOccupied(this.turnRightDirection())) {
            weightedOptions.add(this.turnRightDirection(), 2);
        }
        if (!this.cell.isAdjacentCellOccupied(this.turnLeftDirection())) {
            weightedOptions.add(this.turnLeftDirection(), 2);
        }
        if (!this.cell.isAdjacentCellOccupied(this.backDirection())) {
            weightedOptions.add(this.backDirection(), 1);
        }
        weightedOptions.add(null, 1);
        return weightedOptions.choose();
    }
}
