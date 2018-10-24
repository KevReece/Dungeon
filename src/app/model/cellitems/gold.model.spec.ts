import { FactoryService } from 'src/app/services/factory.service';
import { Gold } from './gold.model';

describe('Gold', () => {
    describe('constructor', () => {
        let mockFactoryService: FactoryService;

        beforeEach(() => {
            mockFactoryService = new FactoryService();
        });

        it('should have a minimum of 10 quantity', () => {
            spyOn(mockFactoryService, 'createRandomNumber').and.returnValue(1);
            const gold = new Gold(mockFactoryService);

            expect(mockFactoryService.createRandomNumber).toHaveBeenCalledWith(1, 10);
            expect(gold.quantity).toEqual(10);
        });

        it('should have a maximum of 100 quantity', () => {
            spyOn(mockFactoryService, 'createRandomNumber').and.returnValue(10);
            const gold = new Gold(mockFactoryService);

            expect(mockFactoryService.createRandomNumber).toHaveBeenCalledWith(1, 10);
            expect(gold.quantity).toEqual(100);
        });
    });
});
