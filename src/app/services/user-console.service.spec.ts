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

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should write welcome message', () => {
    service.writeWelcome();
    expect(service.lines[service.lines.length - 1]).toContain('Welcome');
  });

  it('should write gold treasure message', () => {
    const gold = TestFactory.createGold();
    service.writeTreasureChestOpenedAndGoldDropped(gold);
    expect(service.lines[service.lines.length - 1]).toContain('treasure');
    expect(service.lines[service.lines.length - 1]).toContain(gold.quantity.toString());
  });

  it('should write items collected message', () => {
    const gold = TestFactory.createGold();
    service.writeItemsCollected([gold]);
    expect(service.lines[service.lines.length - 1]).toContain('collected');
    expect(service.lines[service.lines.length - 1]).toContain('gold');
  });

  it('should write attack succeeded message', () => {
    service.writeAttackSucceeded(5);
    expect(service.lines[service.lines.length - 1]).toContain('succeeded');
    expect(service.lines[service.lines.length - 1]).toContain('5');
  });

  it('should write attack failed message', () => {
    service.writeAttackFailed();
    expect(service.lines[service.lines.length - 1]).toContain('failed');
  });
});
