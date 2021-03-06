import { TestBed } from '@angular/core/testing';

import { UserConsoleService } from './user-console.service';
import { Gold } from '../model/cellitems/gold.model';
import { TestFactory } from '../testhelpers/test-factory';

describe('UserConsoleService', () => {
  let service: UserConsoleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.get(UserConsoleService);
  });

  const getLastMessage = (): string => {
    return service.lines[service.lines.length - 1];
  };

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should write welcome message', () => {
    service.startAndWelcome();
    expect(getLastMessage()).toContain('Welcome');
  });

  it('should write gold treasure message', () => {
    const gold = TestFactory.createGold();
    service.writeTreasureChestOpenedAndGoldDropped(gold);
    expect(getLastMessage()).toContain('treasure');
    expect(getLastMessage()).toContain(gold.quantity.toString());
  });

  it('should write food treasure message', () => {
    service.writeTreasureChestOpenedAndFoodDropped();
    expect(getLastMessage()).toContain('food');
  });

  it('should write items collected message', () => {
    service.writeItemsCollected([TestFactory.createGold(), TestFactory.createFood()]);
    expect(getLastMessage()).toContain('collected');
    expect(getLastMessage()).toContain('gold');
    expect(getLastMessage()).toContain('food');
  });

  it('should write attack succeeded message', () => {
    service.writeAttackSucceeded(TestFactory.createGoblin(), TestFactory.createCharacter(), 5);
    expect(getLastMessage()).toContain('succeeded');
    expect(getLastMessage()).toContain(TestFactory.createGoblin().name);
    expect(getLastMessage()).toContain(TestFactory.createCharacter().name);
    expect(getLastMessage()).toContain('5');
  });

  it('should write attack failed message', () => {
    service.writeAttackFailed(TestFactory.createGoblin(), TestFactory.createCharacter());
    expect(getLastMessage()).toContain(TestFactory.createGoblin().name);
    expect(getLastMessage()).toContain(TestFactory.createCharacter().name);
    expect(getLastMessage()).toContain('failed');
  });

  it('should write enemy killed message', () => {
    service.writeEnemyDied(TestFactory.createGoblin());
    expect(getLastMessage()).toContain(TestFactory.createGoblin().name);
    expect(getLastMessage()).toContain('slain');
  });

  it('should write charactor killed message', () => {
    service.writeCharacterDied(TestFactory.createCharacter());
    expect(getLastMessage()).toContain(TestFactory.createCharacter().name);
    expect(getLastMessage()).toContain('killed');
  });

  it('should write experience gained message', () => {
    service.writeExperienceGained(2);
    expect(getLastMessage()).toContain('experience');
    expect(getLastMessage()).toContain('2');
  });

  it('should write level upgraded message', () => {
    service.writeLevelUpgraded(2);
    expect(getLastMessage()).toContain('level');
    expect(getLastMessage()).toContain('2');
  });

  it('should write hole entered message', () => {
    service.writeHoleEntered(3);
    expect(getLastMessage()).toContain('level');
    expect(getLastMessage()).toContain('3');
  });

  it('should write enemy spawned message', () => {
    service.writeEnemySpawned(TestFactory.createGoblin());
    expect(getLastMessage()).toContain('entered');
    expect(getLastMessage()).toContain('goblin');
  });
});
