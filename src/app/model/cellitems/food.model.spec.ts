import { Character } from '../celloccupiers/character.model';
import { TestFactory } from 'src/app/testhelpers/test-factory';
import { Food } from './food.model';

describe('Food', () => {
    describe('collect', () => {
        let food: Food;
        let character: Character;

        beforeEach(() => {
            food = new Food();
            character = TestFactory.createCharacter();
        });

        it('should give 25% of max health to character', () => {
            character.health = 1;
            character.maxHealth = 40;

            food.collect(character);

            expect(character.health).toEqual(11);
        });

        it('should give 25% rounded up of max health to character', () => {
            character.health = 1;
            character.maxHealth = 41;

            food.collect(character);

            expect(character.health).toEqual(12);
        });

        it('should not give more health than max health level', () => {
            character.health = 18;
            character.maxHealth = 20;

            food.collect(character);

            expect(character.health).toEqual(20);
        });
    });
});
