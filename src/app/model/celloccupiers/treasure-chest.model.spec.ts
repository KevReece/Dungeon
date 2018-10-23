import { TreasureChest } from './treasure-chest.model';
import { Cell } from '../cell.model';
import { Gold } from '../cellitems/gold.model';
import { UserConsoleService } from 'src/app/services/user-console.service';

describe('TresureChest', () => {
    let mockUserConsoleService: UserConsoleService;

    beforeEach(() => {
        mockUserConsoleService = new UserConsoleService();
        spyOn(mockUserConsoleService, 'writeTreasureChestOpenedAndGoldDropped');
    });

    describe('open', () => {
        it('should remove itself', () => {
            const treasureChest = new TreasureChest(null, mockUserConsoleService);
            const cell = new Cell(treasureChest);

            treasureChest.open();

            expect(cell.isOccupied()).toBeFalsy();
        });

        it('should drop item', () => {
            const treasureChest = new TreasureChest(null, mockUserConsoleService);
            const cell = new Cell(treasureChest);

            treasureChest.open();

            expect(cell.items[0]).toEqual(jasmine.any(Gold));
        });

        it('should tell user console', () => {
            const treasureChest = new TreasureChest(null, mockUserConsoleService);
            const cell = new Cell(treasureChest);

            treasureChest.open();

            expect(mockUserConsoleService.writeTreasureChestOpenedAndGoldDropped).toHaveBeenCalled();
        });
    });
});
