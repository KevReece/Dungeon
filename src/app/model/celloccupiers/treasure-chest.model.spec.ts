import { TreasureChest } from './treasure-chest.model';
import { Cell } from '../cell.model';
import { Gold } from '../cellitems/gold.model';
import { UserConsoleService } from 'src/app/services/user-console.service';
import { FactoryService } from 'src/app/services/factory.service';
import { TestFactory } from 'src/app/testhelpers/test-factory';
import { Food } from '../cellitems/food.model';

describe('TresureChest', () => {
    let mockUserConsoleService: UserConsoleService;
    let mockFactoryService: FactoryService;

    beforeEach(() => {
        mockUserConsoleService = new UserConsoleService();
        mockFactoryService = new FactoryService();
        spyOn(mockUserConsoleService, 'writeTreasureChestOpenedAndGoldDropped');
        spyOn(mockUserConsoleService, 'writeTreasureChestOpenedAndFoodDropped');
        spyOn(mockFactoryService, 'createGold').and.returnValue(TestFactory.createGold());
    });

    describe('open', () => {
        it('should remove itself', () => {
            const treasureChest = new TreasureChest(mockUserConsoleService, mockFactoryService);
            const cell = TestFactory.createCell(treasureChest);

            treasureChest.open();

            expect(cell.isOccupied()).toBeFalsy();
        });

        it('should drop gold on 3 in 4 chance', () => {
            const treasureChest = new TreasureChest(mockUserConsoleService, mockFactoryService);
            const cell = TestFactory.createCell(treasureChest);
            spyOn(mockFactoryService, 'createRandomInteger').and.returnValue(3);

            treasureChest.open();

            expect(cell.items[0]).toEqual(jasmine.any(Gold));
            expect(mockFactoryService.createRandomInteger).toHaveBeenCalledWith(1, 4);
            expect(mockUserConsoleService.writeTreasureChestOpenedAndGoldDropped).toHaveBeenCalled();
        });

        it('should drop food on 1 in 4 chance', () => {
            const treasureChest = new TreasureChest(mockUserConsoleService, mockFactoryService);
            const cell = TestFactory.createCell(treasureChest);
            spyOn(mockFactoryService, 'createRandomInteger').and.returnValue(4);

            treasureChest.open();

            expect(cell.items[0]).toEqual(jasmine.any(Food));
            expect(mockFactoryService.createRandomInteger).toHaveBeenCalledWith(1, 4);
            expect(mockUserConsoleService.writeTreasureChestOpenedAndFoodDropped).toHaveBeenCalled();
        });
    });
});
