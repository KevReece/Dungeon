import { Enemy } from '../enemy.model';

export class Troll extends Enemy {
    name = 'Troll';
    health = 8;
    attack = 4;
    defence = 5;
    damage = 3;
    experienceValue = 4;
    awarenessDistance = 5;
}
