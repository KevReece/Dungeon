import { CellOccupier } from './cell-occupier.model';

export abstract class Fighter extends CellOccupier {

    name: string;
    health: number;
    attack: number;
    defence: number;
    damage: number;

    isAlive(): boolean {
        return this.health > 0;
    }

    takeDamage(damage: number): void {
        if (this.health > damage) {
            this.health -= damage;
        } else {
            this.health = 0;
            this.die();
        }
    }

    die(): void { }
    killedOpponent(fighter: Fighter): void { }
}
