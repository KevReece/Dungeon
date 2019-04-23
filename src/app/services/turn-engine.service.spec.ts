import { TestBed } from '@angular/core/testing';
import { TurnEngineService } from './turn-engine.service';
import { Character } from '../model/celloccupiers/character.model';
import { Direction } from '../model/direction.model';
import { TestFactory } from '../testhelpers/test-factory';
import { Enemy } from '../model/celloccupiers/enemy.model';
import { EnemySorterService } from './enemy-sorter.service';
import { ActionOption } from '../model/action-option';
import { EnemySpawnerService } from './enemy-spawner.service';

describe('TurnEngineService', () => {
  it('should be created', () => {
    TestBed.configureTestingModule({});
    const service = TestBed.get(TurnEngineService);
    expect(service).toBeTruthy();
  });

  describe('executeTurn', () => {
    let service: TurnEngineService;
    let character: Character;
    let enemies: Enemy[];
    let enemy: Enemy;
    let enemySorterService: EnemySorterService;
    let enemySpawnerService: EnemySpawnerService;
    const charactorActionOptions = [ActionOption.Move, ActionOption.Move, ActionOption.None, ActionOption.Move];

    beforeEach(() => {
      enemySpawnerService = new EnemySpawnerService(null, null);
      enemySorterService = new EnemySorterService();
      service = new TurnEngineService(enemySorterService);
      character = TestFactory.createCharacter();
      enemy = TestFactory.createGoblin();
      enemies = [enemy];
      spyOn(enemy, 'act');
      spyOn(enemySorterService, 'sort');
      spyOn(character, 'getActionOptions').and.returnValue(charactorActionOptions);
      service.initialize(character, enemies, enemySpawnerService);
    });

    it('should move character', () => {
      spyOn(character, 'act').and.returnValue(true);
      spyOn(enemySpawnerService, 'stepSpawnCycle').and.returnValue(null);

      service.executeTurn(Direction.Left);

      expect(character.act).toHaveBeenCalledWith(Direction.Left);
    });

    it('should call act for all enemies', () => {
      spyOn(character, 'act').and.returnValue(true);
      spyOn(enemySpawnerService, 'stepSpawnCycle').and.returnValue(null);

      service.executeTurn(Direction.Left);

      expect(enemy.act).toHaveBeenCalledWith(character);
    });

    it('should sort enemies after actions', () => {
      spyOn(character, 'act').and.returnValue(true);
      spyOn(enemySpawnerService, 'stepSpawnCycle').and.returnValue(null);

      service.executeTurn(Direction.Left);

      expect(enemySorterService.sort).toHaveBeenCalledWith(enemies, character);
    });

    it('should return character action options', () => {
      spyOn(character, 'act').and.returnValue(true);
      spyOn(enemySpawnerService, 'stepSpawnCycle').and.returnValue(null);

      const actionOptions = service.executeTurn(Direction.Left);

      expect(character.getActionOptions).toHaveBeenCalled();
      expect(actionOptions).toBe(charactorActionOptions);
    });

    it('should not continue if character doesnt act', () => {
      spyOn(character, 'act').and.returnValue(false);

      service.executeTurn(Direction.Left);

      expect(character.act).toHaveBeenCalledWith(Direction.Left);
      expect(enemy.act).not.toHaveBeenCalled();
      expect(enemySorterService.sort).not.toHaveBeenCalled();
    });

    it('should add spawned enemies to enemies array', () => {
      spyOn(character, 'act').and.returnValue(true);
      const spawnedEnemy = TestFactory.createGoblin();
      spyOn(enemySpawnerService, 'stepSpawnCycle').and.returnValue(spawnedEnemy);

      service.executeTurn(Direction.Left);

      expect(enemies.length).toBe(2);
      expect(enemies[1]).toBeTruthy(spawnedEnemy);
    });

    it('should leave enemies when none spawned', () => {
      spyOn(character, 'act').and.returnValue(true);
      spyOn(enemySpawnerService, 'stepSpawnCycle').and.returnValue(null);

      service.executeTurn(Direction.Left);

      expect(enemies.length).toBe(1);
    });
  });
});
