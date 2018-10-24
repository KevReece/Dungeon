import { TestBed } from '@angular/core/testing';

import { FactoryService } from './factory.service';
import { Wall } from '../model/celloccupiers/wall.model';
import { Cell } from '../model/cell.model';
import { Character } from '../model/celloccupiers/character.model';
import { TreasureChest } from '../model/celloccupiers/treasure-chest.model';
import { Enemy } from '../model/celloccupiers/enemy.model';
import { TestFactory } from '../testhelpers/test-factory.spec';
import { Gold } from '../model/cellitems/gold.model';

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

  it('should create an enemy', () => {
    expect(service.createEnemy()).toEqual(jasmine.any(Enemy));
  });

  it('should create a random number', () => {
    expect(service.createRandomNumber(1, 2)).toEqual(jasmine.any(Number));
  });

  it('should create gold', () => {
    expect(service.createGold()).toEqual(jasmine.any(Gold));
  });
});
