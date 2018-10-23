import { CellOccupier } from './cell-occupier.model';
import { Charactor } from './charactor.model';

export class Enemy extends CellOccupier {
    typeName = 'Goblin';
    health = 2;
    attack = 1;
    defence = 1;
 }
