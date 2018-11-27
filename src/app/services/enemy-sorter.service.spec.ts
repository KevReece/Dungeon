import { TestBed } from '@angular/core/testing';

import { EnemySorterService } from './enemy-sorter.service';
import { Enemy } from '../model/celloccupiers/enemy.model';
import { Character } from '../model/celloccupiers/character.model';
import { Cell } from '../model/cell.model';
import { TestFactory } from '../testhelpers/test-factory';

describe('EnemySorterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EnemySorterService = TestBed.get(EnemySorterService);
    expect(service).toBeTruthy();
  });

  it('should return for empty enemies', () => {
    const enemies = [];

    new EnemySorterService().sort(enemies, null);

    expect(enemies.length).toEqual(0);
  });

  it('should return for single enemies', () => {
    const enemies = [TestFactory.createGoblin()];

    new EnemySorterService().sort(enemies, null);

    expect(enemies.length).toEqual(1);
  });

  it('should remove dead enemies', () => {
    const enemies = [TestFactory.createGoblin()];
    enemies[0].health = 0;

    new EnemySorterService().sort(enemies, null);

    expect(enemies.length).toEqual(0);
  });

  it('should remove several dead enemies', () => {
    const enemies = [TestFactory.createGoblin(), TestFactory.createGoblin(), TestFactory.createGoblin(), TestFactory.createGoblin()];
    enemies[0].health = 0;
    const livingEnemy = enemies[1];
    enemies[2].health = 0;
    enemies[3].health = 0;

    new EnemySorterService().sort(enemies, null);

    expect(enemies.length).toEqual(1);
    expect(enemies[0]).toEqual(livingEnemy);
  });

  it('should not sort enemies if correct already', () => {
    const enemyA = <Enemy>TestFactory.createCell(TestFactory.createGoblin()).occupier;
    const enemyB = <Enemy>TestFactory.createCell(TestFactory.createGoblin()).occupier;
    const character = <Character>TestFactory.createCell(TestFactory.createCharacter()).occupier;
    const enemies = [enemyA, enemyB];
    spyOn(enemyA.cell, 'getDistance').and.returnValue(1);
    spyOn(enemyB.cell, 'getDistance').and.returnValue(2);

    new EnemySorterService().sort(enemies, character);

    expect(enemies[0]).toBe(enemyA);
    expect(enemies[1]).toBe(enemyB);
  });

  it('should sort enemies by character distance', () => {
    const enemyA = <Enemy>TestFactory.createCell(TestFactory.createGoblin()).occupier;
    const enemyB = <Enemy>TestFactory.createCell(TestFactory.createGoblin()).occupier;
    const character = <Character>TestFactory.createCell(TestFactory.createCharacter()).occupier;
    const enemies = [enemyA, enemyB];
    spyOn(enemyA.cell, 'getDistance').and.returnValue(2);
    spyOn(enemyB.cell, 'getDistance').and.returnValue(1);

    new EnemySorterService().sort(enemies, character);

    expect(enemies[0]).toBe(enemyB);
    expect(enemies[1]).toBe(enemyA);
  });

  it('should not sort same distance enemies by direction from character (clockwise from up) if correct already', () => {
    const enemyA = <Enemy>TestFactory.createCell(TestFactory.createGoblin()).occupier;
    const enemyB = <Enemy>TestFactory.createCell(TestFactory.createGoblin()).occupier;
    const character = <Character>TestFactory.createCell(TestFactory.createCharacter()).occupier;
    const enemies = [enemyA, enemyB];
    spyOn(enemyA.cell, 'getDistance').and.returnValue(1);
    spyOn(enemyB.cell, 'getDistance').and.returnValue(1);
    spyOn(character.cell, 'getAngleFromUpTo').and.callFake(function(enemyCell) { return enemyCell === enemyA.cell ? 0 : 90; });

    new EnemySorterService().sort(enemies, character);

    expect(enemies[0]).toBe(enemyA);
    expect(enemies[1]).toBe(enemyB);
  });

  it('should not sort same distance enemies by direction from character (clockwise from up) if correct already', () => {
    const enemyA = <Enemy>TestFactory.createCell(TestFactory.createGoblin()).occupier;
    const enemyB = <Enemy>TestFactory.createCell(TestFactory.createGoblin()).occupier;
    const character = <Character>TestFactory.createCell(TestFactory.createCharacter()).occupier;
    const enemies = [enemyA, enemyB];
    spyOn(enemyA.cell, 'getDistance').and.returnValue(1);
    spyOn(enemyB.cell, 'getDistance').and.returnValue(1);
    spyOn(character.cell, 'getAngleFromUpTo').and.callFake((enemyCell) => enemyCell === enemyA.cell ? 90 : 0);

    new EnemySorterService().sort(enemies, character);

    expect(enemies[0]).toBe(enemyB);
    expect(enemies[1]).toBe(enemyA);
  });

  it('should sort many enemies', () => {
    const enemyA = <Enemy>TestFactory.createCell(TestFactory.createGoblin()).occupier;
    const enemyB = <Enemy>TestFactory.createCell(TestFactory.createGoblin()).occupier;
    const enemyC = <Enemy>TestFactory.createCell(TestFactory.createGoblin()).occupier;
    const enemyD = <Enemy>TestFactory.createCell(TestFactory.createGoblin()).occupier;
    const enemyE = <Enemy>TestFactory.createCell(TestFactory.createGoblin()).occupier;
    const character = <Character>TestFactory.createCell(TestFactory.createCharacter()).occupier;
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

  it('should sort different enemy types', () => {
    const enemyA = <Enemy>TestFactory.createCell(TestFactory.createOrc()).occupier;
    const enemyB = <Enemy>TestFactory.createCell(TestFactory.createGoblin()).occupier;
    const character = <Character>TestFactory.createCell(TestFactory.createCharacter()).occupier;
    const enemies = [enemyA, enemyB];
    spyOn(enemyA.cell, 'getDistance').and.returnValue(2);
    spyOn(enemyB.cell, 'getDistance').and.returnValue(1);

    new EnemySorterService().sort(enemies, character);

    expect(enemies[0]).toBe(enemyB);
    expect(enemies[1]).toBe(enemyA);
  });

});
