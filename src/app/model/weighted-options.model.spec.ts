import { WeightedOptions } from './weighted-options.model';
import { FactoryService } from '../services/factory.service';

describe('WeightedOptions', () => {
    let factoryService: FactoryService;

    beforeEach(() => {
        factoryService = new FactoryService();
    });

    describe('add and choose', () => {
        it('should return null for no options', () => {
            const weightedOptions = new WeightedOptions(factoryService);

            const choice = weightedOptions.choose();

            expect(choice).toBe(null);
        });

        it('should choose a weighted opton', () => {
            const weightedOptions = new WeightedOptions(factoryService);
            spyOn(factoryService, 'createRandomInteger').and.returnValue(1);

            weightedOptions.add('test', 1);
            const choice = weightedOptions.choose();

            expect(choice).toBe('test');
            expect(factoryService.createRandomInteger).toHaveBeenCalledWith(1, 1);
        });

        it('should choose a weighted opton from two options', () => {
            const weightedOptions = new WeightedOptions(factoryService);
            spyOn(factoryService, 'createRandomInteger').and.returnValue(5);

            weightedOptions.add(1.0, 4);
            weightedOptions.add('fish', 1);
            const choice = weightedOptions.choose();

            expect(choice).toBe('fish');
            expect(factoryService.createRandomInteger).toHaveBeenCalledWith(1, 5);
        });

        it('should choose a null opton', () => {
            const weightedOptions = new WeightedOptions(factoryService);
            spyOn(factoryService, 'createRandomInteger').and.returnValue(7);

            weightedOptions.add('hat', 3);
            weightedOptions.add(null, 4);
            weightedOptions.add(10, 5);
            const choice = weightedOptions.choose();

            expect(choice).toBeNull();
            expect(factoryService.createRandomInteger).toHaveBeenCalledWith(1, 12);
        });

        it('should choose a complex opton from many options', () => {
            const weightedOptions = new WeightedOptions(factoryService);
            spyOn(factoryService, 'createRandomInteger').and.returnValue(10);

            weightedOptions.add(1.0, 4);
            weightedOptions.add('fish', 3);
            weightedOptions.add(null, 2);
            weightedOptions.add(3.5, 8);
            weightedOptions.add(1, 6);
            const choice = weightedOptions.choose();

            expect(choice).toBe(3.5);
            expect(factoryService.createRandomInteger).toHaveBeenCalledWith(1, 23);
        });
    });
});
