import { FactoryService } from 'src/app/services/factory.service';
import { Gold } from './gold.model';
import { Character } from '../celloccupiers/character.model';
import { TestFactory } from 'src/app/testhelpers/test-factory';

describe('Gold', () => {
    let mockFactoryService: FactoryService;

    beforeEach(() => {
        mockFactoryService = new FactoryService();
    });

    describe('constructor', () => {
        it('should have a minimum of 10 quantity', () => {
            spyOn(mockFactoryService, 'createRandomInteger').and.returnValue(1);
            const gold = new Gold(mockFactoryService);

            expect(mockFactoryService.createRandomInteger).toHaveBeenCalledWith(1, 10);
            expect(gold.quantity).toEqual(10);
        });

        it('should have a maximum of 100 quantity', () => {
            spyOn(mockFactoryService, 'createRandomInteger').and.returnValue(10);
            const gold = new Gold(mockFactoryService);

            expect(mockFactoryService.createRandomInteger).toHaveBeenCalledWith(1, 10);
            expect(gold.quantity).toEqual(100);
        });
    });

    describe('collect', () => {
        let gold: Gold;
        let character: Character;

        beforeEach(() => {
            spyOn(mockFactoryService, 'createRandomInteger').and.returnValue(10);
            gold = new Gold(mockFactoryService);
            character = TestFactory.createCharacter();
        });

        it('should give gold to character', () => {
            character.gold = 40;

            gold.collect(character);

            expect(character.gold).toEqual(140);
        });
    });
});
