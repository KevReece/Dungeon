import { Gold } from './gold.model';

describe('Gold', () => {
    describe('constructor', () => {
        it('should have random quantity from 10 to 100 and a multiple of 10', () => {
            const gold = new Gold();

            expect(gold.quantity).toBeGreaterThanOrEqual(10);
            expect(gold.quantity).toBeLessThanOrEqual(100);
            expect(gold.quantity % 10).toEqual(0);
        });
    });
});
