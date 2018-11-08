import { Fighter } from './fighter.model';
import { Direction } from '../direction.model';
import { FactoryService } from 'src/app/services/factory.service';
import { Cell } from '../cell.model';
import { DirectionHelper } from '../direction-helper';
import { Character } from './character.model';
import { FightService } from 'src/app/services/fight.service';

export class Enemy extends Fighter {
    name = 'Goblin';
    health = 2;
    attack = 1;
    defence = 1;
    damage = 1;
    experienceValue = 2;
    direction: Direction;

    constructor(private factoryService: FactoryService, private fightService: FightService) {
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
        if (this.cell.getDistance(character.cell) < 1.5) {
            this.fightService.attack(this, character);
        } else {
            this.move(character);
        }
    }

    private move(character: Character) {
        let directionToMoveIn: Direction;
        const awarenessDistance = 10;
        if (this.cell.getDistance(character.cell) <= awarenessDistance) {
            directionToMoveIn = this.chaseDirection(character);
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

    private chaseDirection(character: Character) {
        const rowDifference = character.cell.rowIndex - this.cell.rowIndex;
        const columnDifference = character.cell.columnIndex - this.cell.columnIndex;
        const verticalDirection = rowDifference === 0 ? null : rowDifference > 0 ? Direction.Down : Direction.Up;
        const horizontalDirection = columnDifference === 0 ? null : columnDifference > 0 ? Direction.Right : Direction.Left;
        const haveVerticalOption = verticalDirection != null && !this.cell.isAdjacentCellOccupied(verticalDirection);
        const haveHorizontalOption = horizontalDirection != null && !this.cell.isAdjacentCellOccupied(horizontalDirection);
        if (!haveVerticalOption) {
            return haveHorizontalOption ? horizontalDirection : null;
        }
        if (!haveHorizontalOption) {
            return verticalDirection;
        }
        const sumDifference = Math.abs(columnDifference) + Math.abs(rowDifference);
        const randomFromSum = this.factoryService.createRandomInteger(1, sumDifference);
        if (randomFromSum <= Math.abs(columnDifference)) {
            return horizontalDirection;
        }
        return verticalDirection;
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
