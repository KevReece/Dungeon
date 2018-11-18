import { CellOccupier } from './cell-occupier.model';
import { Character } from './character.model';

export class Hole extends CellOccupier {

    enter(character: Character): void {
        console.log('character entered hole');
    }
}
