import { Fighter } from './fighter.model';
import { Direction } from '../direction.model';

export class Enemy extends Fighter {
    typeName = 'Goblin';
    health = 2;
    attack = 1;
    defence = 1;
    damage = 1;
    experienceValue = 2;

    die(): void {
        this.cell.occupier = null;
    }

    act(): void {
        const adjacentCell = this.cell.getAdjacentCell(Direction.Up);
        if (!adjacentCell.isOccupied()) {
            adjacentCell.setOccupier(this);
        }
    }
 }
