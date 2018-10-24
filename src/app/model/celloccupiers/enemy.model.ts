import { Fighter } from './fighter.model';

export class Enemy extends Fighter {
    typeName = 'Goblin';
    experienceValue = 2;

    die(): void {
        this.cell.occupier = null;
    }
 }
