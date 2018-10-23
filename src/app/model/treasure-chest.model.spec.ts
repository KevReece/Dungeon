import { TreasureChest } from './treasure-chest.model';
import { Cell } from './cell.model';

describe('TresureChest', () => {
    describe('open', () => {
        it('should remove itself', () => {
            const treasureChest = new TreasureChest();
            const cell = new Cell(treasureChest);

            treasureChest.open();

            expect(cell.isOccupied()).toBeFalsy();
        });
    });
});
