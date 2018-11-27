import { Enemy } from '../enemy.model';

export class Goblin extends Enemy {
    name = 'Goblin';
    health = 2;
    attack = 1;
    defence = 1;
    damage = 1;
    experienceValue = 2;
    awarenessDistance = 10;
}
