import { Fighter } from './fighter.model';

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
 }
