import { TestBed } from '@angular/core/testing';

import { TurnEngineService } from './turn-engine.service';
import { Character } from '../model/celloccupiers/character.model';
import { Direction } from '../model/direction.model';
import { TestFactory } from '../testhelpers/test-factory';
import { Enemy } from '../model/celloccupiers/enemy.model';
import { EnemySorterService } from './enemy-sorter.service';
import { ActionOption } from '../model/action-option';

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
    const charactorActionOptions = [ActionOption.Move, ActionOption.Move, ActionOption.None, ActionOption.Move];

    beforeEach(() => {
      service = new TurnEngineService(mockEnemySorterService);
      character = TestFactory.createCharacter();
      enemy = TestFactory.createGoblin();
      enemies = [enemy];
      spyOn(enemy, 'act');
      spyOn(mockEnemySorterService, 'sort');
      spyOn(character, 'getActionOptions').and.returnValue(charactorActionOptions);
      service.initialize(character, enemies);
    });

    it('should move character', () => {
      spyOn(character, 'act').and.returnValue(true);

      service.executeTurn(Direction.Left);

      expect(character.act).toHaveBeenCalledWith(Direction.Left);
    });

    it('should call act for all enemies', () => {
      spyOn(character, 'act').and.returnValue(true);

      service.executeTurn(Direction.Left);

      expect(enemy.act).toHaveBeenCalledWith(character);
    });

    it('should sort enemies after actions', () => {
      spyOn(character, 'act').and.returnValue(true);

      service.executeTurn(Direction.Left);

      expect(mockEnemySorterService.sort).toHaveBeenCalledWith(enemies, character);
    });

    it('should return character action options', () => {
      spyOn(character, 'act').and.returnValue(true);

      const actionOptions = service.executeTurn(Direction.Left);

      expect(character.getActionOptions).toHaveBeenCalled();
      expect(actionOptions).toBe(charactorActionOptions);
    });

    it('should not continue if character doesnt act', () => {
      spyOn(character, 'act').and.returnValue(false);

      service.executeTurn(Direction.Left);

      expect(character.act).toHaveBeenCalledWith(Direction.Left);
      expect(enemy.act).not.toHaveBeenCalled();
      expect(mockEnemySorterService.sort).not.toHaveBeenCalled();
    });
  });
});
