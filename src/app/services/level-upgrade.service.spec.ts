import { TestBed } from '@angular/core/testing';

import { LevelUpgradeService } from './level-upgrade.service';
import { Character } from '../model/celloccupiers/character.model';
import { TestFactory } from '../testhelpers/test-factory';
import { UserConsoleService } from './user-console.service';

describe('LevelUpgradeService', () => {
  describe('(integrated)', () => {
    it('should be created', () => {
      TestBed.configureTestingModule({});
      const service: LevelUpgradeService = TestBed.get(LevelUpgradeService);
      expect(service).toBeTruthy();
    });
  });

  describe('(isolated)', () => {
    let service: LevelUpgradeService;
    let character: Character;
    let mockUserConsoleService: UserConsoleService;

    beforeEach(() => {
      character = TestFactory.createCharacter();
      mockUserConsoleService = new UserConsoleService();
      service = new LevelUpgradeService(mockUserConsoleService);
      spyOn(mockUserConsoleService, 'writeLevelUpgraded');
    });

    describe('initialize', () => {

      it('should set the charactor to level 1', () => {
        character.experience = 0;

        service.initialize(character);

        expect(character.level).toEqual(1);
        expect(character.damage).toEqual(1);
        expect(character.attack).toEqual(1);
        expect(character.defence).toEqual(1);
        expect(character.maxHealth).toEqual(10);
        expect(character.health).toEqual(10);
      });
    });

    describe('check', () => {

      it('should not upgrade the charactor', () => {
        character.experience = 6;

        service.check(character);

        expect(character.level).toEqual(1);
      });

      it('should upgrade the charactor to level 2', () => {
        character.experience = 7;

        service.check(character);

        expect(character.level).toEqual(2);
        expect(character.damage).toEqual(1);
        expect(character.attack).toEqual(2);
        expect(character.defence).toEqual(2);
        expect(character.maxHealth).toEqual(11);
      });

      it('should send charactor upgrade message', () => {
        character.experience = 7;

        service.check(character);

        expect(mockUserConsoleService.writeLevelUpgraded).toHaveBeenCalledWith(2);
      });

      it('should increase the charactor health to match gained max health', () => {
        character.health = 5;
        character.experience = 7;

        service.check(character);

        expect(character.health).toEqual(6);
        expect(character.maxHealth).toEqual(11);
      });

      it('should not upgrade the charactor to level 3 too early', () => {
        character.experience = 18;

        service.check(character);

        expect(character.level).toEqual(2);
      });

      it('should upgrade the charactor to level 3', () => {
        character.experience = 19;

        service.check(character);

        expect(character.level).toEqual(3);
        expect(character.attack).toEqual(4);
        expect(character.defence).toEqual(3);
        expect(character.damage).toEqual(2);
        expect(character.maxHealth).toEqual(13);
      });
    });
  });
});
