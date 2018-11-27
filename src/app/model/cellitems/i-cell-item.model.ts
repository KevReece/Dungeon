import { Character } from '../celloccupiers/character.model';

export interface ICellItem {
    collect(character: Character): void;
}
