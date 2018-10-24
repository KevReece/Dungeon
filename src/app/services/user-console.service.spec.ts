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
    service.writeWelcome();
    expect(getLastMessage()).toContain('Welcome');
  });

  it('should write gold treasure message', () => {
    const gold = TestFactory.createGold();
    service.writeTreasureChestOpenedAndGoldDropped(gold);
    expect(getLastMessage()).toContain('treasure');
    expect(getLastMessage()).toContain(gold.quantity.toString());
  });

  it('should write items collected message', () => {
    const gold = TestFactory.createGold();
    service.writeItemsCollected([gold]);
    expect(getLastMessage()).toContain('collected');
    expect(getLastMessage()).toContain('gold');
  });

  it('should write attack succeeded message', () => {
    service.writeAttackSucceeded(5);
    expect(getLastMessage()).toContain('succeeded');
    expect(getLastMessage()).toContain('5');
  });

  it('should write attack failed message', () => {
    service.writeAttackFailed();
    expect(getLastMessage()).toContain('failed');
  });

  it('should write experience gained message', () => {
    service.writeExperienceGained(2);
    expect(getLastMessage()).toContain('experience');
    expect(getLastMessage()).toContain('2');
  });
});
