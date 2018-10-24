import { TreasureChest } from './treasure-chest.model';
import { Cell } from '../cell.model';
import { Gold } from '../cellitems/gold.model';
import { UserConsoleService } from 'src/app/services/user-console.service';
import { FactoryService } from 'src/app/services/factory.service';
import { TestFactory } from 'src/app/testhelpers/test-factory';

describe('TresureChest', () => {
    let mockUserConsoleService: UserConsoleService;
    let mockFactoryService: FactoryService;

    beforeEach(() => {
        mockUserConsoleService = new UserConsoleService();
        mockFactoryService = new FactoryService();
        spyOn(mockUserConsoleService, 'writeTreasureChestOpenedAndGoldDropped');
        spyOn(mockFactoryService, 'createGold').and.returnValue(TestFactory.createGold());
    });

    describe('open', () => {
        it('should remove itself', () => {
            const treasureChest = new TreasureChest(mockUserConsoleService, mockFactoryService);
            const cell = new Cell(treasureChest);

            treasureChest.open();

            expect(cell.isOccupied()).toBeFalsy();
        });

        it('should drop item', () => {
            const treasureChest = new TreasureChest(mockUserConsoleService, mockFactoryService);
            const cell = new Cell(treasureChest);

            treasureChest.open();

            expect(cell.items[0]).toEqual(jasmine.any(Gold));
        });

        it('should tell user console', () => {
            const treasureChest = new TreasureChest(mockUserConsoleService, mockFactoryService);
            const cell = new Cell(treasureChest);

            treasureChest.open();

            expect(mockUserConsoleService.writeTreasureChestOpenedAndGoldDropped).toHaveBeenCalled();
        });
    });
});
