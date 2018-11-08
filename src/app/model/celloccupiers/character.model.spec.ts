import { Character } from './character.model';
import { Direction } from '../direction.model';
import { MapGrid } from '../map-grid.model';
import { Row } from '../row.model';
import { Cell } from '../cell.model';
import { Wall } from './wall.model';
import { UserConsoleService } from 'src/app/services/user-console.service';
import { Enemy } from './enemy.model';
import { FightService } from 'src/app/services/fight.service';
import { TestFactory } from 'src/app/testhelpers/test-factory';
import { LevelUpgradeService } from 'src/app/services/level-upgrade.service';

describe('Character', () => {
    let character: Character;
    let mockUserConsoleService: UserConsoleService;
    let mockFightService: FightService;
    let mockLevelUpgradeService: LevelUpgradeService;

    beforeEach(() => {
        mockUserConsoleService = new UserConsoleService();
        mockFightService = new FightService(null, null);
        mockLevelUpgradeService = new LevelUpgradeService(null);
        spyOn(mockUserConsoleService, 'writeItemsCollected');
        spyOn(mockUserConsoleService, 'writeExperienceGained');
        character = new Character(mockUserConsoleService, mockFightService, mockLevelUpgradeService);
    });

    describe('constructor', () => {
        it('should setup defaults', () => {
            expect(character.attack).toBe(1);
            expect(character.defence).toBe(1);
            expect(character.experience).toBe(0);
            expect(character.gold).toBe(0);
            expect(character.health).toBe(10);
            expect(character.level).toBe(1);
            expect(character.damage).toBe(1);
        });
    });

    describe('initializeToCell', () => {
        it('should be getable', () => {
            const cell = TestFactory.createCell();

            character.initializeToCell(cell);

            expect(character.getCell()).toBe(cell);
        });
    });

    describe('act', () => {
        it('should move the character', () => {
            const mapGrid = new MapGrid([new Row([TestFactory.createCell(character)]), new Row([TestFactory.createCell()])]);

            character.act(Direction.Down);

            expect(character.getCell()).toBe(mapGrid.rows[1].cells[0]);
        });

        it('should not move the character out of bounds', () => {
            const mapGrid = new MapGrid([new Row([TestFactory.createCell(character)])]);

            character.act(Direction.Up);

            expect(character.getCell()).toBe(mapGrid.rows[0].cells[0]);
        });

        it('should not move the character into occupied cell', () => {
            const mapGrid = new MapGrid([new Row([TestFactory.createCell(character), TestFactory.createCell(new Wall())])]);

            character.act(Direction.Right);

            expect(character.getCell()).toBe(mapGrid.rows[0].cells[0]);
        });

        it('should open a treasure chest', () => {
            const treasureChest = TestFactory.createTreasureChest();
            const mapGrid = new MapGrid([new Row([TestFactory.createCell(character), TestFactory.createCell(treasureChest)])]);
            spyOn(treasureChest, 'open');

            character.act(Direction.Right);

            expect(treasureChest.open).toHaveBeenCalled();
        });

        it('should collect gold', () => {
            const gold = TestFactory.createGold();
            const newCell = TestFactory.createCell();
            newCell.items.push(gold);
            const mapGrid = new MapGrid([new Row([TestFactory.createCell(character), newCell])]);

            character.act(Direction.Right);

            expect(character.gold).toEqual(gold.quantity);
            expect(newCell.items.length).toEqual(0);
        });

        it('should raise items collected console message', () => {
            const gold = TestFactory.createGold();
            const newCell = TestFactory.createCell();
            newCell.items.push(gold);
            const mapGrid = new MapGrid([new Row([TestFactory.createCell(character), newCell])]);

            character.act(Direction.Right);

            expect(mockUserConsoleService.writeItemsCollected).toHaveBeenCalled();
        });

        it('shouldn\'t raise items collected console message for no items', () => {
            const gold = TestFactory.createGold();
            const newCell = TestFactory.createCell();
            const mapGrid = new MapGrid([new Row([TestFactory.createCell(character), newCell])]);

            character.act(Direction.Right);

            expect(mockUserConsoleService.writeItemsCollected).not.toHaveBeenCalled();
        });

        it('should fight enemy', () => {
            const enemy = TestFactory.createEnemy();
            const mapGrid = new MapGrid([new Row([TestFactory.createCell(character), TestFactory.createCell(enemy)])]);
            spyOn(mockFightService, 'attack');

            character.act(Direction.Right);

            expect(mockFightService.attack).toHaveBeenCalledWith(character, enemy);
        });
    });

    describe('killedOpponent', () => {
        beforeEach(() => spyOn(mockLevelUpgradeService, 'check'));

        it('should increase experience', () => {
            character.killedOpponent(TestFactory.createEnemy());

            expect(character.experience).toEqual(2);
        });

        it('should send experience gained message', () => {
            character.killedOpponent(TestFactory.createEnemy());

            expect(mockUserConsoleService.writeExperienceGained).toHaveBeenCalledWith(2);
        });

        it('should check for level upgrade', () => {
            character.killedOpponent(TestFactory.createEnemy());

            expect(mockLevelUpgradeService.check).toHaveBeenCalledWith(character);
        });
    });
});
