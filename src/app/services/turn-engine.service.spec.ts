import { TestBed } from '@angular/core/testing';

import { TurnEngineService } from './turn-engine.service';
import { Character } from '../model/celloccupiers/character.model';
import { Direction } from '../model/direction.model';
import { TestFactory } from '../testhelpers/test-factory';
import { Enemy } from '../model/celloccupiers/enemy.model';
import { EnemySorterService } from './enemy-sorter.service';

describe('TurnEngineService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TurnEngineService = TestBed.get(TurnEngineService);
    expect(service).toBeTruthy();
  });

  describe('executeTurn', () => {
    let service: TurnEngineService;
    let character: Character;
    let enemies: Enemy[];
    let enemy: Enemy;
    const mockEnemySorterService: EnemySorterService = new EnemySorterService();

    beforeEach(() => {
      service = new TurnEngineService(mockEnemySorterService);
      character = TestFactory.createCharacter();
      enemy = TestFactory.createEnemy();
      enemies = [enemy];
      spyOn(character, 'act');
      spyOn(enemy, 'act');
      spyOn(mockEnemySorterService, 'sort');
      service.initialize(character, enemies);
    });

    it('should move character', () => {
      service.executeTurn(Direction.Left);

      expect(character.act).toHaveBeenCalledWith(Direction.Left);
    });

    it('should call act for all enemies', () => {
      service.executeTurn(Direction.Left);

      expect(enemy.act).toHaveBeenCalled();
    });

    it('should sort enemies after actions', () => {
      service.executeTurn(Direction.Left);

      expect(mockEnemySorterService.sort).toHaveBeenCalledWith(enemies, character);
    });
  });
});
