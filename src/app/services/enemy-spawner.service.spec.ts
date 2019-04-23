import { TestBed } from '@angular/core/testing';

import { EnemySpawnerService } from './enemy-spawner.service';
import { FactoryService } from './factory.service';
import { TestFactory } from '../testhelpers/test-factory';
import { Enemy } from '../model/celloccupiers/enemy.model';
import { MapGrid } from '../model/map-grid.model';
import { UserConsoleService } from './user-console.service';

describe('EnemySpawnerService', () => {

  it('should be created', () => {
    TestBed.configureTestingModule({});
    expect(TestBed.get(EnemySpawnerService)).toBeTruthy();
  });

  let enemySpawnerService: EnemySpawnerService;
  let factoryService: FactoryService;
  let userConsoleService: UserConsoleService;
  let mapGrid: MapGrid;
  let enemy: Enemy;
  let enemySpy: jasmine.Spy;

  beforeEach(() => {
    factoryService = new FactoryService();
    mapGrid = TestFactory.createMapGrid();
    userConsoleService = new UserConsoleService();
    enemy = TestFactory.createGoblin();
    enemySpy = spyOn(factoryService, 'createEnemy').and.returnValue(enemy);
    enemySpawnerService = new EnemySpawnerService(factoryService, userConsoleService);
    enemySpawnerService.initialize(mapGrid, 1);
  });

  it('should spawn easy', () => {
    const spawned = enemySpawnerService.spawnEasy();
    expect(factoryService.createEnemy).toHaveBeenCalledWith('Goblin');
    expect(spawned).toBe(enemy);
  });

  it('should spawn hard', () => {
    enemySpawnerService.initialize(mapGrid, 1);
    
    const spawned = enemySpawnerService.spawnHard();
    expect(factoryService.createEnemy).toHaveBeenCalledWith('Orc');
    expect(spawned).toBe(enemy);
  });
  
  it('should spawn hardest when above required level', () => {
    enemySpawnerService.initialize(mapGrid, 5);

    const spawned = enemySpawnerService.spawnEasy();
    expect(factoryService.createEnemy).toHaveBeenCalledWith('Troll');
    expect(spawned).toBe(enemy);
  });

  it('should return null on non-spawn turns', () => {
    spyOn(mapGrid, 'randomUnoccupiedCell').and.returnValue(enemy);
    for (let index = 0; index < 19; index++) {
      const spawned = enemySpawnerService.stepSpawnCycle();
      expect(spawned).toBeNull();
    }
  });

  it('should return null when all cells occupied', () => {
    for (let index = 0; index < 19; index++) enemySpawnerService.stepSpawnCycle();
    spyOn(mapGrid, 'randomUnoccupiedCell').and.returnValue(null);

    const spawned = enemySpawnerService.stepSpawnCycle();
    expect(spawned).toBeNull();
  });

  it('should return enemy', () => {
    for (let index = 0; index < 19; index++) enemySpawnerService.stepSpawnCycle();
    spyOn(mapGrid, 'randomUnoccupiedCell').and.returnValue(TestFactory.createCell());

    const spawned = enemySpawnerService.stepSpawnCycle();
    
    expect(factoryService.createEnemy).toHaveBeenCalledWith('Goblin');
    expect(spawned).toBe(enemy);
  });
  
  it('should set enemy to a random cell', () => {
    for (let index = 0; index < 19; index++) enemySpawnerService.stepSpawnCycle();
    const cell = TestFactory.createCell();
    spyOn(mapGrid, 'randomUnoccupiedCell').and.returnValue(cell);

    const spawned = enemySpawnerService.stepSpawnCycle();
    expect(spawned.cell).toBe(cell);
  });

  it('should write enemy spawned to console', () => {
    for (let index = 0; index < 19; index++) enemySpawnerService.stepSpawnCycle();
    spyOn(mapGrid, 'randomUnoccupiedCell').and.returnValue(TestFactory.createCell());
    spyOn(userConsoleService, 'writeEnemySpawned');

    const spawned = enemySpawnerService.stepSpawnCycle();
    expect(userConsoleService.writeEnemySpawned).toHaveBeenCalledWith(spawned);
  });

  it('should return enemy at initial level for specified count', () => {
    for (let index = 0; index < 59; index++) enemySpawnerService.stepSpawnCycle();
    spyOn(mapGrid, 'randomUnoccupiedCell').and.returnValue(TestFactory.createCell());

    const spawned = enemySpawnerService.stepSpawnCycle();
    expect(spawned).toBe(enemy);
    expect(factoryService.createEnemy).toHaveBeenCalledWith('Goblin');
    expect(factoryService.createEnemy).toHaveBeenCalledWith('Goblin');
    expect(factoryService.createEnemy).toHaveBeenCalledWith('Goblin');
  });

  it('should return enemy at higher level for specified count', () => {
    for (let index = 0; index < 120; index++) enemySpawnerService.stepSpawnCycle();
    spyOn(mapGrid, 'randomUnoccupiedCell').and.returnValue(TestFactory.createCell());
    enemySpy.calls.reset();
    for (let index = 0; index < 119; index++) enemySpawnerService.stepSpawnCycle();

    const spawned = enemySpawnerService.stepSpawnCycle();
    expect(spawned).toBe(enemy);
    expect(factoryService.createEnemy).toHaveBeenCalledTimes(6);
    expect(factoryService.createEnemy).toHaveBeenCalledWith('Orc');
    expect(factoryService.createEnemy).toHaveBeenCalledWith('Troll');
  });

  it('should return enemy at highest level when enemy name no longer defined', () => {
    for (let index = 0; index < 240; index++) enemySpawnerService.stepSpawnCycle();
    spyOn(mapGrid, 'randomUnoccupiedCell').and.returnValue(TestFactory.createCell());
    enemySpy.calls.reset();
    for (let index = 0; index < 99; index++) enemySpawnerService.stepSpawnCycle();

    const spawned = enemySpawnerService.stepSpawnCycle();
    expect(spawned).toBe(enemy);
    expect(factoryService.createEnemy).toHaveBeenCalledTimes(5);
    expect(factoryService.createEnemy).toHaveBeenCalledWith('Troll');
  });
});
