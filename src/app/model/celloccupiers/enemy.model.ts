import { CellOccupier } from './cell-occupier.model';
import { Character } from './character.model';

export class Enemy extends CellOccupier {
    typeName = 'Goblin';
    health = 2;
    attack = 1;
    defence = 1;
 }
