import { Enemy } from './enemy.model';
import { Cell } from '../cell.model';
import { MapGrid } from '../map-grid.model';
import { Row } from '../row.model';
import { FactoryService } from 'src/app/services/factory.service';
import { Direction } from '../direction.model';
import { TestFactory } from 'src/app/testhelpers/test-factory';
import { SpyExtensions } from 'src/app/testhelpers/spy-extensions';
import { Character } from './character.model';
import { FightService } from 'src/app/services/fight.service';
import { Wall } from './wall.model';
import { UserConsoleService } from 'src/app/services/user-console.service';
import { Goblin } from './enemies/goblin.model';

describe('Enemy', () => {
    let enemy: Enemy;
    let factoryService: FactoryService;
    let fightService: FightService;
    let userConsoleService: UserConsoleService;
    let createRandomIntegerResponses: number[];
    let character: Character;

    beforeEach(() => {
        createRandomIntegerResponses = [0];
        userConsoleService = new UserConsoleService();
        factoryService = new FactoryService();
        spyOn(factoryService, 'createRandomInteger')
          .and.callFake(SpyExtensions.returnValuesAs(createRandomIntegerResponses));
        character = TestFactory.createCharacter();
        const characterCell = TestFactory.createCell(character);
        fightService = new FightService(null, null);
    });

    describe('constructor', () => {
        it('should set the direction', () => {
            createRandomIntegerResponses[0] = 3;

            enemy = new Goblin(factoryService, fightService, userConsoleService);

            expect(enemy.direction).toBe(Direction.Left);
        });
    });

    describe('die', () => {
        beforeEach(() => {
            enemy = new Goblin(factoryService, fightService, userConsoleService);
        });

        it('should clear the cell occupation', () => {
            const cell = TestFactory.createCell(enemy);
            expect(enemy.cell.occupier).not.toBeNull();

            enemy.die();

            expect(enemy.cell.occupier).toBeNull();
        });

        it('should write death message', () => {
            spyOn(userConsoleService, 'writeEnemyDied');

            enemy.die();

            expect(userConsoleService.writeEnemyDied).toHaveBeenCalledWith(enemy);
        });
    });

    describe('act', () => {
        let mapGrid: MapGrid;

        describe(' fight the charactor', () => {
            beforeEach(() => {
                enemy = new Goblin(factoryService, fightService, userConsoleService);
            });

            it(' should attack if adjacent', () => {
                mapGrid = TestFactory.create9x9MapGrid(enemy);
                const enemyCell = enemy.cell;
                spyOn(enemyCell, 'getDistance').and.returnValue(1);
                spyOn(fightService, 'attack');

                enemy.act(character);

                expect(enemyCell.getDistance).toHaveBeenCalledWith(character.cell);
                expect(fightService.attack).toHaveBeenCalledWith(enemy, character);
            });

            it(' should attack if diagonal', () => {
                const enemyCell = TestFactory.createCell(enemy);
                spyOn(enemyCell, 'getDistance').and.returnValue(1.414);
                spyOn(fightService, 'attack');

                enemy.act(character);

                expect(enemyCell.getDistance).toHaveBeenCalledWith(character.cell);
                expect(fightService.attack).toHaveBeenCalledWith(enemy, character);
            });
        });

        describe(' move towards the charactor', () => {
            beforeEach(() => {
                enemy = new Goblin(factoryService, fightService, userConsoleService);
            });

            it(' should happen if near enough', () => {
                mapGrid = TestFactory.create9x9MapGrid();
                mapGrid.rows[0].cells[0].setOccupier(enemy);
                mapGrid.rows[0].cells[2].setOccupier(character);
                const enemyCell = enemy.cell;
                spyOn(enemyCell, 'getDistance').and.returnValue(10);

                enemy.act(character);

                expect(enemyCell.getDistance).toHaveBeenCalledWith(character.cell);
                expect(enemy.getCell()).toBe(mapGrid.rows[0].cells[1]);
                expect(enemy.direction).toBe(Direction.Right);
            });

            it(' should happen if near enough Left', () => {
                mapGrid = TestFactory.create9x9MapGrid();
                mapGrid.rows[0].cells[0].setOccupier(character);
                mapGrid.rows[0].cells[2].setOccupier(enemy);
                const enemyCell = enemy.cell;
                spyOn(enemyCell, 'getDistance').and.returnValue(10);

                enemy.act(character);

                expect(enemy.getCell()).toBe(mapGrid.rows[0].cells[1]);
                expect(enemy.direction).toBe(Direction.Left);
            });

            it(' should happen if near enough Up', () => {
                mapGrid = TestFactory.create9x9MapGrid();
                mapGrid.rows[0].cells[0].setOccupier(character);
                mapGrid.rows[2].cells[0].setOccupier(enemy);
                const enemyCell = enemy.cell;
                spyOn(enemyCell, 'getDistance').and.returnValue(10);

                enemy.act(character);

                expect(enemy.getCell()).toBe(mapGrid.rows[1].cells[0]);
                expect(enemy.direction).toBe(Direction.Up);
            });

            it(' should not happen if blocked', () => {
                mapGrid = TestFactory.create9x9MapGrid();
                mapGrid.rows[0].cells[0].setOccupier(enemy);
                mapGrid.rows[0].cells[1].setOccupier(new Wall());
                mapGrid.rows[0].cells[2].setOccupier(character);
                const enemyCell = enemy.cell;
                spyOn(enemyCell, 'getDistance').and.returnValue(10);

                enemy.act(character);

                expect(enemy.getCell()).toBe(mapGrid.rows[0].cells[0]);
                expect(enemy.direction).toBe(Direction.Up);
            });

            it(' should do random as horizontal for diagonal', () => {
                mapGrid = TestFactory.create9x9MapGrid();
                mapGrid.rows[0].cells[0].setOccupier(enemy);
                mapGrid.rows[1].cells[2].setOccupier(character);
                const enemyCell = enemy.cell;
                spyOn(enemyCell, 'getDistance').and.returnValue(10);
                createRandomIntegerResponses[1] = 2;

                enemy.act(character);

                expect(enemy.getCell()).toBe(mapGrid.rows[0].cells[1]);
                expect(enemy.direction).toBe(Direction.Right);
                expect(factoryService.createRandomInteger).toHaveBeenCalledWith(1, 3);
            });

            it(' should do random as vertical for diagonal', () => {
                mapGrid = TestFactory.create9x9MapGrid();
                mapGrid.rows[0].cells[0].setOccupier(enemy);
                mapGrid.rows[1].cells[2].setOccupier(character);
                const enemyCell = enemy.cell;
                spyOn(enemyCell, 'getDistance').and.returnValue(10);
                createRandomIntegerResponses[1] = 3;

                enemy.act(character);

                expect(enemy.getCell()).toBe(mapGrid.rows[1].cells[0]);
                expect(enemy.direction).toBe(Direction.Down);
                expect(factoryService.createRandomInteger).toHaveBeenCalledWith(1, 3);
            });
        });

        describe(' from an upward start direction', () => {
            beforeEach(() => {
                enemy = new Goblin(factoryService, fightService, userConsoleService);
                mapGrid = TestFactory.create9x9MapGrid(enemy);
            });

            it('should get random 1 to 10 for movement', () => {
                createRandomIntegerResponses[1] = 6;

                enemy.act(character);

                expect(factoryService.createRandomInteger).toHaveBeenCalledWith(1, 12);
            });

            it('should move forward', () => {
                createRandomIntegerResponses[1] = 6;

                enemy.act(character);

                expect(enemy.getCell()).toBe(mapGrid.rows[0].cells[1]);
                expect(enemy.direction).toBe(Direction.Up);
            });

            it('should turn right', () => {
                createRandomIntegerResponses[1] = 8;

                enemy.act(character);

                expect(enemy.getCell()).toBe(mapGrid.rows[1].cells[2]);
                expect(enemy.direction).toBe(Direction.Right);
            });

            it('should turn left', () => {
                createRandomIntegerResponses[1] = 10;

                enemy.act(character);

                expect(enemy.getCell()).toBe(mapGrid.rows[1].cells[0]);
                expect(enemy.direction).toBe(Direction.Left);
            });

            it('should move backwards', () => {
                createRandomIntegerResponses[1] = 11;

                enemy.act(character);

                expect(enemy.getCell()).toBe(mapGrid.rows[2].cells[1]);
                expect(enemy.direction).toBe(Direction.Down);
            });

            it('should stay still', () => {
                createRandomIntegerResponses[1] = 12;

                enemy.act(character);

                expect(enemy.getCell()).toBe(mapGrid.rows[1].cells[1]);
                expect(enemy.direction).toBe(Direction.Up);
            });
        });

        describe(' from a downward start direction', () => {

            beforeEach(() => {
                createRandomIntegerResponses[0] = 2;
                enemy = new Goblin(factoryService, fightService, userConsoleService);
                mapGrid = TestFactory.create9x9MapGrid(enemy);
            });

            it('should move forward', () => {
                createRandomIntegerResponses[1] = 6;

                enemy.act(character);

                expect(enemy.getCell()).toBe(mapGrid.rows[2].cells[1]);
                expect(enemy.direction).toBe(Direction.Down);
            });

            it('should turn right', () => {
                createRandomIntegerResponses[1] = 8;

                enemy.act(character);

                expect(enemy.getCell()).toBe(mapGrid.rows[1].cells[0]);
                expect(enemy.direction).toBe(Direction.Left);
            });

            it('should turn left', () => {
                createRandomIntegerResponses[1] = 10;

                enemy.act(character);

                expect(enemy.getCell()).toBe(mapGrid.rows[1].cells[2]);
                expect(enemy.direction).toBe(Direction.Right);
            });

            it('should move backwards', () => {
                createRandomIntegerResponses[1] = 11;

                enemy.act(character);

                expect(enemy.getCell()).toBe(mapGrid.rows[0].cells[1]);
                expect(enemy.direction).toBe(Direction.Up);
            });

            it('should stay still', () => {
                createRandomIntegerResponses[1] = 12;

                enemy.act(character);

                expect(enemy.getCell()).toBe(mapGrid.rows[1].cells[1]);
                expect(enemy.direction).toBe(Direction.Down);
            });
        });

        describe(' from a blocked position', () => {

            beforeEach(() => {
                createRandomIntegerResponses[0] = 1;
                enemy = new Goblin(factoryService, fightService, userConsoleService);
            });

            it('should not move when fully blocked', () => {
                mapGrid = new MapGrid([new Row([TestFactory.createCell(enemy)])]);
                createRandomIntegerResponses[1] = 1;

                enemy.act(character);

                expect(enemy.getCell()).toBe(mapGrid.rows[0].cells[0]);
                expect(factoryService.createRandomInteger).toHaveBeenCalledWith(1, 1);
            });

            it('should move with single option', () => {
                mapGrid = new MapGrid([new Row([TestFactory.createCell(enemy), TestFactory.createCell()])]);
                createRandomIntegerResponses[1] = 6;

                enemy.act(character);

                expect(enemy.getCell()).toBe(mapGrid.rows[0].cells[1]);
                expect(factoryService.createRandomInteger).toHaveBeenCalledWith(1, 7);
            });

            it('should move back with single option', () => {
                mapGrid = new MapGrid([new Row([TestFactory.createCell(), TestFactory.createCell(enemy)])]);
                createRandomIntegerResponses[1] = 1;

                enemy.act(character);

                expect(enemy.getCell()).toBe(mapGrid.rows[0].cells[0]);
                expect(factoryService.createRandomInteger).toHaveBeenCalledWith(1, 2);
            });

            it('should stay still with single option', () => {
                mapGrid = new MapGrid([new Row([TestFactory.createCell(enemy), TestFactory.createCell()])]);
                createRandomIntegerResponses[1] = 7;

                enemy.act(character);

                expect(enemy.getCell()).toBe(mapGrid.rows[0].cells[0]);
                expect(factoryService.createRandomInteger).toHaveBeenCalledWith(1, 7);
            });

            it('should move with limited options', () => {
                mapGrid = new MapGrid([new Row([TestFactory.createCell(), TestFactory.createCell(enemy), TestFactory.createCell()])]);
                createRandomIntegerResponses[1] = 6;

                enemy.act(character);

                expect(enemy.getCell()).toBe(mapGrid.rows[0].cells[2]);
                expect(factoryService.createRandomInteger).toHaveBeenCalledWith(1, 8);
            });
        });
    });
});
