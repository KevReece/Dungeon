import { TestBed } from '@angular/core/testing';

import { FightService } from './fight.service';
import { Character } from '../model/celloccupiers/character.model';
import { Enemy } from '../model/celloccupiers/enemy.model';
import { UserConsoleService } from './user-console.service';
import { FactoryService } from './factory.service';

describe('FightService', () => {
  let service: FightService;

  it('should be created', () => {
    TestBed.configureTestingModule({});

    service = TestBed.get(FightService);

    expect(service).toBeTruthy();
  });

  describe('attack', () => {
    let mockUserConsoleService: UserConsoleService;
    let mockFactoryService: FactoryService;
    let character: Character;
    let enemy: Enemy;

    beforeEach(() => {
      character = new Character(null, null);
      enemy = new Enemy();
      mockUserConsoleService = new UserConsoleService();
      mockFactoryService = new FactoryService(null);
      spyOn(mockUserConsoleService, 'writeAttackSucceeded');
      spyOn(mockUserConsoleService, 'writeAttackFailed');
      service = new FightService(mockUserConsoleService, mockFactoryService);
    });

    it('should damage defender', () => {
      character.attack = 2;
      enemy.defence = 1;
      spyOn(mockFactoryService, 'createRandomNumber').and.returnValue(0);

      service.attack(character, enemy);

      expect(enemy.health).toEqual(1);
    });

    it('should send success message to user console', () => {
      character.attack = 2;
      enemy.defence = 1;
      spyOn(mockFactoryService, 'createRandomNumber').and.returnValue(0);

      service.attack(character, enemy);

      expect(mockUserConsoleService.writeAttackSucceeded).toHaveBeenCalledWith(1);
    });

    it('should not damage defender when attack is not quite strong enough', () => {
      character.attack = 1;
      enemy.defence = 1;
      spyOn(mockFactoryService, 'createRandomNumber').and.returnValue(0);

      service.attack(character, enemy);

      expect(enemy.health).toEqual(2);
    });

    it('should send failed message to user console', () => {
      character.attack = 1;
      enemy.defence = 1;
      spyOn(mockFactoryService, 'createRandomNumber').and.returnValue(0);

      service.attack(character, enemy);

      expect(mockUserConsoleService.writeAttackFailed).toHaveBeenCalled();
    });

    it('should damage defender when attack is not quite strong enough but luck assists', () => {
      character.attack = 1;
      enemy.defence = 1;
      spyOn(mockFactoryService, 'createRandomNumber').and.returnValue(1);

      service.attack(character, enemy);

      expect(enemy.health).toEqual(1);
      expect(mockFactoryService.createRandomNumber).toHaveBeenCalledWith(-3, 4);
    });

    it('should not damage defender when attack is not strong enough even with full luck', () => {
      character.attack = 1;
      enemy.defence = 5;
      spyOn(mockFactoryService, 'createRandomNumber').and.returnValue(4);

      service.attack(character, enemy);

      expect(enemy.health).toEqual(2);
    });

    it('should damage defender when attack is strong enough only with full luck', () => {
      character.attack = 1;
      enemy.defence = 4;
      spyOn(mockFactoryService, 'createRandomNumber').and.returnValue(4);

      service.attack(character, enemy);

      expect(enemy.health).toEqual(1);
    });

    it('should not damage defender when attack is very strong enough but full bad luck just stops it', () => {
      character.attack = 4;
      enemy.defence = 1;
      spyOn(mockFactoryService, 'createRandomNumber').and.returnValue(-3);

      service.attack(character, enemy);

      expect(enemy.health).toEqual(2);
    });

    it('should damage defender when attack is just strong enough to overcome full bad luck', () => {
      character.attack = 5;
      enemy.defence = 1;
      spyOn(mockFactoryService, 'createRandomNumber').and.returnValue(-3);

      service.attack(character, enemy);

      expect(enemy.health).toEqual(1);
    });
  });
});
