import { ICellItem } from './i-cell-item.model';
import { Character } from '../celloccupiers/character.model';

export class Food implements ICellItem {
    collect(character: Character): void {
        const quarterOfMaxHealth = Math.ceil(character.maxHealth / 4);
        if (character.health + quarterOfMaxHealth >= character.maxHealth) {
            character.health = character.maxHealth;
        } else {
            character.health += quarterOfMaxHealth;
        }
    }
}
