import { Character } from './character.model';
import { Direction } from '../direction.model';
import { MapGrid } from '../map-grid.model';
import { Row } from '../row.model';
import { Cell } from '../cell.model';
import { Wall } from './wall.model';
import { UserConsoleService } from 'src/app/services/user-console.service';
import { FightService } from 'src/app/services/fight.service';
import { TestFactory } from 'src/app/testhelpers/test-factory';
import { CharacterLevelUpgradeService } from 'src/app/services/character-level-upgrade.service';
import { ActionOption } from '../action-option';
import { Hole } from './hole.model';

describe('Character', () => {
    let character: Character;
    let userConsoleService: UserConsoleService;
    let mockFightService: FightService;
    let mockLevelUpgradeService: CharacterLevelUpgradeService;

    beforeEach(() => {
        userConsoleService = new UserConsoleService();
        mockFightService = new FightService(null, null);
        mockLevelUpgradeService = new CharacterLevelUpgradeService(null);
        spyOn(userConsoleService, 'writeItemsCollected');
        spyOn(userConsoleService, 'writeExperienceGained');
        character = new Character(userConsoleService, mockFightService, mockLevelUpgradeService);
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

    describe('die', () => {
        it('should write death message', () => {
            spyOn(userConsoleService, 'writeCharacterDied');

            character.die();

            expect(userConsoleService.writeCharacterDied).toHaveBeenCalledWith(character);
        });
    });

    describe('act', () => {
        it('should do nothing if dead', () => {
            character.health = 0;
            const mapGrid = new MapGrid([new Row([TestFactory.createCell(character)]), new Row([TestFactory.createCell()])]);

            const result = character.act(Direction.Down);

            expect(character.getCell()).toBe(mapGrid.rows[0].cells[0]);
            expect(result).toBeFalsy();
        });

        it('should move the character', () => {
            const mapGrid = new MapGrid([new Row([TestFactory.createCell(character)]), new Row([TestFactory.createCell()])]);

            const result = character.act(Direction.Down);

            expect(character.getCell()).toBe(mapGrid.rows[1].cells[0]);
            expect(result).toBeTruthy();
        });

        it('should not move the character out of bounds', () => {
            const mapGrid = new MapGrid([new Row([TestFactory.createCell(character)])]);

            const result = character.act(Direction.Up);

            expect(character.getCell()).toBe(mapGrid.rows[0].cells[0]);
            expect(result).toBeFalsy();
        });

        it('should not move the character into occupied cell', () => {
            const mapGrid = new MapGrid([new Row([TestFactory.createCell(character), TestFactory.createCell(new Wall())])]);

            const result = character.act(Direction.Right);

            expect(character.getCell()).toBe(mapGrid.rows[0].cells[0]);
            expect(result).toBeFalsy();
        });

        it('should open a treasure chest', () => {
            const treasureChest = TestFactory.createTreasureChest();
            const mapGrid = new MapGrid([new Row([TestFactory.createCell(character), TestFactory.createCell(treasureChest)])]);
            spyOn(treasureChest, 'open');

            const result = character.act(Direction.Right);

            expect(treasureChest.open).toHaveBeenCalled();
            expect(result).toBeTruthy();
        });

        it('should collect items', () => {
            const item = TestFactory.createGold();
            spyOn(item, 'collect');
            const newCell = TestFactory.createCell();
            newCell.items.push(item);
            const mapGrid = new MapGrid([new Row([TestFactory.createCell(character), newCell])]);

            const result = character.act(Direction.Right);

            expect(newCell.items.length).toEqual(0);
            expect(result).toBeTruthy();
            expect(item.collect).toHaveBeenCalledWith(character);
        });

        it('should raise items collected console message', () => {
            const gold = TestFactory.createGold();
            const newCell = TestFactory.createCell();
            newCell.items.push(gold);
            const mapGrid = new MapGrid([new Row([TestFactory.createCell(character), newCell])]);

            character.act(Direction.Right);

            expect(userConsoleService.writeItemsCollected).toHaveBeenCalled();
        });

        it('shouldn\'t raise items collected console message for no items', () => {
            const gold = TestFactory.createGold();
            const newCell = TestFactory.createCell();
            const mapGrid = new MapGrid([new Row([TestFactory.createCell(character), newCell])]);

            character.act(Direction.Right);

            expect(userConsoleService.writeItemsCollected).not.toHaveBeenCalled();
        });

        it('should fight enemy', () => {
            const enemy = TestFactory.createGoblin();
            const mapGrid = new MapGrid([new Row([TestFactory.createCell(character), TestFactory.createCell(enemy)])]);
            spyOn(mockFightService, 'attack');

            const result = character.act(Direction.Right);

            expect(mockFightService.attack).toHaveBeenCalledWith(character, enemy);
            expect(result).toBeTruthy();
        });

        it('should enter hole', () => {
            const hole = TestFactory.createHole();
            const mapGrid = new MapGrid([new Row([TestFactory.createCell(character), TestFactory.createCell(hole)])]);
            spyOn(hole, 'enter');

            const result = character.act(Direction.Right);

            expect(hole.enter).toHaveBeenCalledWith(character);
            expect(result).toBeTruthy();
        });
    });

    describe('killedOpponent', () => {
        beforeEach(() => spyOn(mockLevelUpgradeService, 'check'));

        it('should increase experience', () => {
            character.killedOpponent(TestFactory.createGoblin());

            expect(character.experience).toEqual(2);
        });

        it('should send experience gained message', () => {
            character.killedOpponent(TestFactory.createGoblin());

            expect(userConsoleService.writeExperienceGained).toHaveBeenCalledWith(2);
        });

        it('should check for level upgrade', () => {
            character.killedOpponent(TestFactory.createGoblin());

            expect(mockLevelUpgradeService.check).toHaveBeenCalledWith(character);
        });
    });

    describe('getActionOptions', () => {
        it('should return None when blocked', () => {
            const mapGrid = new MapGrid([new Row([new Cell(character), new Cell(new Wall())])]);

            expect(character.getActionOptions()[1]).toBe(ActionOption.None);
        });

        it('should return Move when not blocked', () => {
            const mapGrid = new MapGrid([new Row([new Cell(character), new Cell()])]);

            expect(character.getActionOptions()[1]).toBe(ActionOption.Move);
        });

        it('should return Fight when blocked by enemy', () => {
            const mapGrid = new MapGrid([new Row([new Cell(character), new Cell(TestFactory.createGoblin())])]);

            expect(character.getActionOptions()[1]).toBe(ActionOption.Fight);
        });

        it('should return Open when blocked by treasure chest', () => {
            const mapGrid = new MapGrid([new Row([new Cell(character), new Cell(TestFactory.createTreasureChest())])]);

            expect(character.getActionOptions()[1]).toBe(ActionOption.Open);
        });

        it('should return EnterHole when blocked by a hole', () => {
            const mapGrid = new MapGrid([new Row([new Cell(character), new Cell(TestFactory.createHole())])]);

            expect(character.getActionOptions()[1]).toBe(ActionOption.EnterHole);
        });

        it('should return all directions', () => {
            const mapGrid = TestFactory.create9x9MapGrid(character);
            mapGrid.rows[1].cells[2].setOccupier(TestFactory.createGoblin());
            mapGrid.rows[2].cells[1].setOccupier(TestFactory.createTreasureChest());
            mapGrid.rows[1].cells[0].setOccupier(new Wall());

            const actionOptions = character.getActionOptions();

            expect(actionOptions.length).toBe(4);
            expect(actionOptions[0]).toBe(ActionOption.Move);
            expect(actionOptions[1]).toBe(ActionOption.Fight);
            expect(actionOptions[2]).toBe(ActionOption.Open);
            expect(actionOptions[3]).toBe(ActionOption.None);
        });

        it('should return None when dead', () => {
            character.health = 0;

            const actionOptions = character.getActionOptions();

            expect(actionOptions.length).toBe(4);
            expect(actionOptions.every(option => option === ActionOption.None)).toBeTruthy();
        });
    });
});
