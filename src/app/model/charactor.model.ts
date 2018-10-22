import { ICellItem } from './icell-item.model';
import { Direction } from './direction.model';

export class Charactor implements ICellItem {
    level = 1;
    gold = 0;
    experience = 0;
    health = 10;
    attack = 1;
    defence = 1;

    act(direction: Direction) {
    }
}
