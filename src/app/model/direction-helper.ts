import { Direction } from './direction.model';

export class DirectionHelper {
    static RotateRight(direction: Direction): Direction {
        if (direction === Direction.Left) {
            return Direction.Up;
        }
        return direction + 1;
    }

    static RotateLeft(direction: Direction): Direction {
        if (direction === Direction.Up) {
            return Direction.Left;
        }
        return direction - 1;
    }

    static Opposite(direction: Direction): Direction {
        if (direction === Direction.Down || direction === Direction.Left) {
            return direction - 2;
        }
        return direction + 2;
    }
}
