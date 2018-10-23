import { TestBed } from '@angular/core/testing';

import { FactoryService } from './factory.service';
import { Wall } from '../model/celloccupiers/wall.model';
import { Cell } from '../model/cell.model';
import { Charactor } from '../model/celloccupiers/charactor.model';
import { TreasureChest } from '../model/celloccupiers/treasure-chest.model';
import { Enemy } from '../model/celloccupiers/enemy.model';

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

  it('should create a charactor', () => {
    expect(service.createCharactor()).toEqual(jasmine.any(Charactor));
  });

  it('should create a cell occupied by something', () => {
    const charactor = new Charactor(null, null);
    const cell = service.createCellOccupiedBy(charactor);
    expect(cell).toEqual(jasmine.any(Cell));
    expect(cell.occupier).toEqual(jasmine.any(Charactor));
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
});
