import { TreasureChest } from './treasure-chest.model';
import { Cell } from '../cell.model';
import { Gold } from '../cellitems/gold.model';

describe('TresureChest', () => {
    describe('open', () => {
        it('should remove itself', () => {
            const treasureChest = new TreasureChest();
            const cell = new Cell(treasureChest);

            treasureChest.open();

            expect(cell.isOccupied()).toBeFalsy();
        });

        it('should drop item', () => {
            const treasureChest = new TreasureChest();
            const cell = new Cell(treasureChest);

            treasureChest.open();

            expect(cell.items[0]).toEqual(jasmine.any(Gold));
        });
    });
});
