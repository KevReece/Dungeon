import { Direction } from './direction.model';

export class DirectionHelper {

    static all = [Direction.Up, Direction.Right, Direction.Down, Direction.Left];
    static rotateRight(direction: Direction): Direction {
        if (direction === Direction.Left) {
            return Direction.Up;
        }
        return direction + 1;
    }

    static rotateLeft(direction: Direction): Direction {
        if (direction === Direction.Up) {
            return Direction.Left;
        }
        return direction - 1;
    }

    static opposite(direction: Direction): Direction {
        if (direction === Direction.Down || direction === Direction.Left) {
            return direction - 2;
        }
        return direction + 2;
    }

}
