import { TestBed } from '@angular/core/testing';

import { FightService } from './fight.service';
import { Character } from '../model/celloccupiers/character.model';
import { Enemy } from '../model/celloccupiers/enemy.model';
import { UserConsoleService } from './user-console.service';
import { FactoryService } from './factory.service';
import { SpyExtensions } from '../testhelpers/spy-extensions';
import { TestFactory } from '../testhelpers/test-factory';

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
      character = TestFactory.createCharacter();
      enemy = TestFactory.createEnemy();
      mockUserConsoleService = new UserConsoleService();
      mockFactoryService = new FactoryService();
      spyOn(mockUserConsoleService, 'writeAttackSucceeded');
      spyOn(mockUserConsoleService, 'writeAttackFailed');
      spyOn(enemy, 'takeDamage');
      service = new FightService(mockUserConsoleService, mockFactoryService);
    });

    it('should damage defender', () => {
      character.attack = 2;
      enemy.defence = 1;
      spyOn(mockFactoryService, 'createRandomInteger')
        .and.callFake(SpyExtensions.returnValuesAs([0, 1]));
      spyOn(enemy, 'isAlive').and.returnValue(true);

      service.attack(character, enemy);

      expect(enemy.takeDamage).toHaveBeenCalledWith(1);
    });

    it('should send success message to user console', () => {
      character.attack = 2;
      enemy.defence = 1;
      spyOn(mockFactoryService, 'createRandomInteger')
        .and.callFake(SpyExtensions.returnValuesAs([0, 1]));
      spyOn(enemy, 'isAlive').and.returnValue(true);

      service.attack(character, enemy);

      expect(mockUserConsoleService.writeAttackSucceeded).toHaveBeenCalledWith(1);
    });

    it('should not damage defender when attack is not quite strong enough', () => {
      character.attack = 1;
      enemy.defence = 1;
      spyOn(mockFactoryService, 'createRandomInteger')
        .and.callFake(SpyExtensions.returnValuesAs([0, 1]));

      service.attack(character, enemy);

      expect(enemy.takeDamage).not.toHaveBeenCalled();
    });

    it('should send failed message to user console', () => {
      character.attack = 1;
      enemy.defence = 1;
      spyOn(mockFactoryService, 'createRandomInteger')
        .and.callFake(SpyExtensions.returnValuesAs([0, 1]));

      service.attack(character, enemy);

      expect(mockUserConsoleService.writeAttackFailed).toHaveBeenCalled();
    });

    it('should damage defender when attack is not quite strong enough but luck assists', () => {
      character.attack = 1;
      enemy.defence = 1;
      spyOn(mockFactoryService, 'createRandomInteger')
        .and.callFake(SpyExtensions.returnValuesAs([1, 1]));
      spyOn(enemy, 'isAlive').and.returnValue(true);

      service.attack(character, enemy);

      expect(enemy.takeDamage).toHaveBeenCalledWith(1);
      expect(mockFactoryService.createRandomInteger).toHaveBeenCalledWith(-3, 4);
    });

    it('should not damage defender when attack is not strong enough even with full luck', () => {
      character.attack = 1;
      enemy.defence = 5;
      spyOn(mockFactoryService, 'createRandomInteger')
        .and.callFake(SpyExtensions.returnValuesAs([4, 1]));

      service.attack(character, enemy);

      expect(enemy.takeDamage).not.toHaveBeenCalled();
    });

    it('should damage defender when attack is strong enough only with full luck', () => {
      character.attack = 1;
      enemy.defence = 4;
      spyOn(mockFactoryService, 'createRandomInteger')
        .and.callFake(SpyExtensions.returnValuesAs([4, 1]));
      spyOn(enemy, 'isAlive').and.returnValue(true);

      service.attack(character, enemy);

      expect(enemy.takeDamage).toHaveBeenCalledWith(1);
    });

    it('should not damage defender when attack is very strong enough but full bad luck just stops it', () => {
      character.attack = 4;
      enemy.defence = 1;
      spyOn(mockFactoryService, 'createRandomInteger')
        .and.callFake(SpyExtensions.returnValuesAs([-5, 1]));

      service.attack(character, enemy);

      expect(enemy.health).toEqual(2);
      expect(enemy.takeDamage).not.toHaveBeenCalled();
    });

    it('should damage defender when attack is just strong enough to overcome full bad luck', () => {
      character.attack = 5;
      enemy.defence = 1;
      spyOn(mockFactoryService, 'createRandomInteger')
        .and.callFake(SpyExtensions.returnValuesAs([-3, 1]));
      spyOn(enemy, 'isAlive').and.returnValue(true);

      service.attack(character, enemy);

      expect(enemy.takeDamage).toHaveBeenCalledWith(1);
    });

    it('should cause damage with luck multiplier', () => {
      character.attack = 2;
      character.damage = 10;
      spyOn(mockFactoryService, 'createRandomInteger')
        .and.callFake(SpyExtensions.returnValuesAs([0, 15]));

      service.attack(character, enemy);

      expect(enemy.takeDamage).toHaveBeenCalledWith(15);
      expect(mockFactoryService.createRandomInteger).toHaveBeenCalledWith(-3, 4);
      expect(mockFactoryService.createRandomInteger).toHaveBeenCalledWith(5, 15);
    });

    it('should cause damage with bad luck multiplier', () => {
      character.attack = 2;
      character.damage = 10;
      spyOn(mockFactoryService, 'createRandomInteger')
        .and.callFake(SpyExtensions.returnValuesAs([0, 5]));
      spyOn(enemy, 'isAlive').and.returnValue(true);

      service.attack(character, enemy);

      expect(enemy.takeDamage).toHaveBeenCalledWith(5);
      expect(mockFactoryService.createRandomInteger).toHaveBeenCalledWith(-3, 4);
      expect(mockFactoryService.createRandomInteger).toHaveBeenCalledWith(5, 15);
    });

    it('should cause damage with tiny good luck multiplier', () => {
      character.attack = 2;
      character.damage = 1;
      enemy.health = 10;
      spyOn(mockFactoryService, 'createRandomInteger')
        .and.callFake(SpyExtensions.returnValuesAs([0, 2]));
      spyOn(enemy, 'isAlive').and.returnValue(true);

      service.attack(character, enemy);

      expect(enemy.takeDamage).toHaveBeenCalledWith(2);
      expect(mockFactoryService.createRandomInteger).toHaveBeenCalledWith(-3, 4);
      expect(mockFactoryService.createRandomInteger).toHaveBeenCalledWith(1, 2);
    });

    it('should cause damage with tiny bad luck multiplier', () => {
      character.attack = 2;
      character.damage = 1;
      spyOn(mockFactoryService, 'createRandomInteger')
        .and.callFake(SpyExtensions.returnValuesAs([0, 1]));
      spyOn(enemy, 'isAlive').and.returnValue(true);

      service.attack(character, enemy);

      expect(enemy.takeDamage).toHaveBeenCalledWith(1);
      expect(mockFactoryService.createRandomInteger).toHaveBeenCalledWith(-3, 4);
      expect(mockFactoryService.createRandomInteger).toHaveBeenCalledWith(1, 2);
    });

    it('should kill if damage exceeds health', () => {
      character.attack = 2;
      character.damage = 1;
      spyOn(mockFactoryService, 'createRandomInteger')
        .and.callFake(SpyExtensions.returnValuesAs([0, 2]));
      spyOn(enemy, 'isAlive').and.returnValue(false);
      spyOn(character, 'killedOpponent');

      service.attack(character, enemy);

      expect(enemy.takeDamage).toHaveBeenCalledWith(2);
      expect(character.killedOpponent).toHaveBeenCalledWith(enemy);
    });
  });
});
