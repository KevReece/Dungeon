import { Cell } from './cell.model';
import { Charactor } from './celloccupiers/charactor.model';
import { Wall } from './celloccupiers/wall.model';

describe('Cell', () => {
    describe('constructor', () => {
        it('should construct without cell item', () => {
            expect(new Cell()).toBeTruthy();
        });

        it('should call set occupier', () => {
            const charactor = new Charactor(null);

            const cell = new Cell(charactor);

            expect(cell.occupier).toBe(charactor);
        });
    });

    describe('setOccupier', () => {

        it('should set cell occupier', () => {
            const charactor = new Charactor(null);

            const cell = new Cell(charactor);

            expect(cell.occupier).toBe(charactor);
        });

        it('should initialize the cell occupier', () => {
            const charactor = new Charactor(null);
            spyOn(charactor, 'initializeToCell');

            const cell = new Cell(charactor);

            expect(charactor.initializeToCell).toHaveBeenCalledWith(cell);
        });

        it('should clear previous cell of occupier', () => {
            const charactor = new Charactor(null);
            const previousCell = new Cell(charactor);

            const newCell = new Cell(charactor);

            expect(previousCell.occupier).toBeNull();
        });
    });

    describe('isOccupied', () => {
        it('should not be occupied', () => {
            expect(new Cell().isOccupied()).toBeFalsy();
        });

        it('should be occupied', () => {
            expect(new Cell(new Wall(null)).isOccupied()).toBeTruthy();
        });
    });
});
