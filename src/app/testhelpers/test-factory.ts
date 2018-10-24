import { Character } from '../model/celloccupiers/character.model';

export class TestFactory {
    static createCharacter(): Character {
        return new Character(null, null);
    }
}
