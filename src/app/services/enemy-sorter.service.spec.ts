import { TestBed } from '@angular/core/testing';

import { EnemySorterService } from './enemy-sorter.service';
import { Enemy } from '../model/celloccupiers/enemy.model';
import { Character } from '../model/celloccupiers/character.model';
import { Cell } from '../model/cell.model';

describe('EnemySorterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnemySorterService = TestBed.get(EnemySorterService);
    expect(service).toBeTruthy();
  });

  it('should return for empty enemies', () => {
    new EnemySorterService().sort([], null);
  });

  it('should return for single enemies', () => {
    new EnemySorterService().sort([new Enemy()], null);
  });

  it('should not sort enemies if correct already', () => {
    const enemyA = <Enemy>new Cell(new Enemy()).occupier;
    const enemyB = <Enemy>new Cell(new Enemy()).occupier;
    const character = <Character>new Cell(new Character(null)).occupier;
    const enemies = [enemyA, enemyB];
    spyOn(enemyA.cell, 'getDistance').and.returnValue(1);
    spyOn(enemyB.cell, 'getDistance').and.returnValue(2);

    new EnemySorterService().sort(enemies, character);

    expect(enemies[0]).toBe(enemyA);
    expect(enemies[1]).toBe(enemyB);
  });

  it('should sort enemies by character distance', () => {
    const enemyA = <Enemy>new Cell(new Enemy()).occupier;
    const enemyB = <Enemy>new Cell(new Enemy()).occupier;
    const character = <Character>new Cell(new Character(null)).occupier;
    const enemies = [enemyA, enemyB];
    spyOn(enemyA.cell, 'getDistance').and.returnValue(2);
    spyOn(enemyB.cell, 'getDistance').and.returnValue(1);

    new EnemySorterService().sort(enemies, character);

    expect(enemies[0]).toBe(enemyB);
    expect(enemies[1]).toBe(enemyA);
  });

  it('should not sort same distance enemies by direction from character (clockwise from up) if correct already', () => {
    const enemyA = <Enemy>new Cell(new Enemy()).occupier;
    const enemyB = <Enemy>new Cell(new Enemy()).occupier;
    const character = <Character>new Cell(new Character(null)).occupier;
    const enemies = [enemyA, enemyB];
    spyOn(enemyA.cell, 'getDistance').and.returnValue(1);
    spyOn(enemyB.cell, 'getDistance').and.returnValue(1);
    spyOn(character.cell, 'getAngleFromUpTo').and.callFake(function(enemyCell) { return enemyCell === enemyA.cell ? 0 : 90; });

    new EnemySorterService().sort(enemies, character);

    expect(enemies[0]).toBe(enemyA);
    expect(enemies[1]).toBe(enemyB);
  });

  it('should not sort same distance enemies by direction from character (clockwise from up) if correct already', () => {
    const enemyA = <Enemy>new Cell(new Enemy()).occupier;
    const enemyB = <Enemy>new Cell(new Enemy()).occupier;
    const character = <Character>new Cell(new Character(null)).occupier;
    const enemies = [enemyA, enemyB];
    spyOn(enemyA.cell, 'getDistance').and.returnValue(1);
    spyOn(enemyB.cell, 'getDistance').and.returnValue(1);
    spyOn(character.cell, 'getAngleFromUpTo').and.callFake((enemyCell) => enemyCell === enemyA.cell ? 90 : 0);

    new EnemySorterService().sort(enemies, character);

    expect(enemies[0]).toBe(enemyB);
    expect(enemies[1]).toBe(enemyA);
  });

  it('should sort many enemies', () => {
    const enemyA = <Enemy>new Cell(new Enemy()).occupier;
    const enemyB = <Enemy>new Cell(new Enemy()).occupier;
    const enemyC = <Enemy>new Cell(new Enemy()).occupier;
    const enemyD = <Enemy>new Cell(new Enemy()).occupier;
    const enemyE = <Enemy>new Cell(new Enemy()).occupier;
    const character = <Character>new Cell(new Character(null)).occupier;
    const enemies = [enemyA, enemyB, enemyC, enemyD, enemyE];
    spyOn(enemyA.cell, 'getDistance').and.returnValue(1);
    spyOn(enemyB.cell, 'getDistance').and.returnValue(2);
    spyOn(enemyC.cell, 'getDistance').and.returnValue(3);
    spyOn(enemyD.cell, 'getDistance').and.returnValue(3);
    spyOn(enemyE.cell, 'getDistance').and.returnValue(1);
    spyOn(character.cell, 'getAngleFromUpTo').and.callFake((enemyCell) => {
      return enemyCell === enemyA.cell ? 90
        : enemyCell === enemyB.cell ? 0
        : enemyCell === enemyC.cell ? 0
        : enemyCell === enemyD.cell ? 90
        :  0;
      });

    new EnemySorterService().sort(enemies, character);

    expect(enemies[0]).toBe(enemyE);
    expect(enemies[1]).toBe(enemyA);
    expect(enemies[2]).toBe(enemyB);
    expect(enemies[3]).toBe(enemyC);
    expect(enemies[4]).toBe(enemyD);
  });
});