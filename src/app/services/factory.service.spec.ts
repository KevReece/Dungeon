import { TestBed } from '@angular/core/testing';

import { FactoryService } from './factory.service';
import { Wall } from '../model/celloccupiers/wall.model';
import { Cell } from '../model/cell.model';
import { Character } from '../model/celloccupiers/character.model';
import { TreasureChest } from '../model/celloccupiers/treasure-chest.model';
import { TestFactory } from '../testhelpers/test-factory';
import { Gold } from '../model/cellitems/gold.model';
import { WeightedOptions } from '../model/weighted-options.model';
import { Goblin } from '../model/celloccupiers/enemies/goblin.model';
import { Orc } from '../model/celloccupiers/enemies/orc.model';
import { Troll } from '../model/celloccupiers/enemies/troll.model';

describe('FactoryService', () => {
  let service: FactoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(FactoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a cell', () => {
    expect(service.createEmptyCell()).toEqual(jasmine.any(Cell));
  });

  it('should create a wall', () => {
    expect(service.createWall()).toEqual(jasmine.any(Wall));
  });

  it('should create a wall cell', () => {
    const cell = service.createWallCell();
    expect(cell).toEqual(jasmine.any(Cell));
    expect(cell.occupier).toEqual(jasmine.any(Wall));
  });

  it('should create a character', () => {
    expect(service.createCharacter()).toEqual(jasmine.any(Character));
  });

  it('should create a cell occupied by something', () => {
    const character = TestFactory.createCharacter();
    const cell = service.createCellOccupiedBy(character);
    expect(cell).toEqual(jasmine.any(Cell));
    expect(cell.occupier).toEqual(jasmine.any(Character));
  });

  it('should create a treasure chest', () => {
    expect(service.createTreasureChest()).toEqual(jasmine.any(TreasureChest));
  });

  it('should create a treasure chest cell', () => {
    const cell = service.createTreasureChestCell();
    expect(cell).toEqual(jasmine.any(Cell));
    expect(cell.occupier).toEqual(jasmine.any(TreasureChest));
  });

  it('should create a goblin', () => {
    expect(service.createEnemy('Goblin')).toEqual(jasmine.any(Goblin));
  });

  it('should create an orc', () => {
    expect(service.createEnemy('Orc')).toEqual(jasmine.any(Orc));
  });

  it('should create a troll', () => {
    expect(service.createEnemy('Troll')).toEqual(jasmine.any(Troll));
  });

  it('should create a random integer', () => {
    const randomNumber = service.createRandomInteger(1, 2);
    expect(randomNumber).toBeGreaterThanOrEqual(1);
    expect(randomNumber).toBeLessThanOrEqual(2);
  });

  it('should create gold', () => {
    expect(service.createGold()).toEqual(jasmine.any(Gold));
  });

  it('should create weighted options', () => {
    expect(service.createWeightedOptions()).toEqual(jasmine.any(WeightedOptions));
  });
});
