import { Enemy } from '../enemy.model';

export class Orc extends Enemy {
    name = 'Orc';
    health = 4;
    attack = 2;
    defence = 2;
    damage = 1;
    experienceValue = 3;
    awarenessDistance = 7;
}
