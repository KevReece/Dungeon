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

describe('Enemy', () => {
    let enemy: Enemy;
    let factoryService: FactoryService;
    let fightService: FightService;
    let createRandomIntegerResponses: number[];
    let character: Character;

    beforeEach(() => {
        createRandomIntegerResponses = [0];
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

            enemy = new Enemy(factoryService, fightService);

            expect(enemy.direction).toBe(Direction.Left);
        });
    });

    describe('die', () => {
        it('should clear the cell occupation', () => {
            enemy = new Enemy(factoryService, fightService);
            const cell = TestFactory.createCell(enemy);
            expect(enemy.cell.occupier).not.toBeNull();

            enemy.die();

            expect(enemy.cell.occupier).toBeNull();
        });
    });

    describe('act', () => {
        let mapGrid: MapGrid;

        describe(' fight the charactor', () => {
            beforeEach(() => {
                enemy = new Enemy(factoryService, fightService);
            });

            it(' should attack if adjacent', () => {
                mapGrid = TestFactory.create9x9MapGridAround(enemy);
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
                enemy = new Enemy(factoryService, fightService);
            });

            it(' should happen if near enough', () => {
                mapGrid = TestFactory.create9x9MapGridAround(enemy);
                const enemyCell = enemy.cell;
                spyOn(enemyCell, 'getDistance').and.returnValue(10);
                spyOn(enemyCell, 'getDirectionTo').and.returnValue(Direction.Down);

                enemy.act(character);

                expect(enemyCell.getDistance).toHaveBeenCalledWith(character.cell);
                expect(enemyCell.getDirectionTo).toHaveBeenCalledWith(character.cell);
                expect(enemy.getCell()).toBe(mapGrid.rows[2].cells[1]);
                expect(enemy.direction).toBe(Direction.Down);
            });

            it(' should happen if close', () => {
                mapGrid = TestFactory.create9x9MapGridAround(enemy);
                const enemyCell = enemy.cell;
                spyOn(enemyCell, 'getDistance').and.returnValue(2);
                spyOn(enemyCell, 'getDirectionTo').and.returnValue(Direction.Down);

                enemy.act(character);

                expect(enemy.getCell()).toBe(mapGrid.rows[2].cells[1]);
            });

            it(' should be blocked if way is occupied', () => {
                const enemyCell = TestFactory.createCell(enemy);
                spyOn(enemyCell, 'getDistance').and.returnValue(10);
                spyOn(enemyCell, 'getDirectionTo').and.returnValue(Direction.Down);

                enemy.act(character);

                expect(enemy.getCell()).toBe(enemyCell);
                expect(enemy.direction).toBe(Direction.Up);
            });
        });

        describe(' from an upward start direction', () => {
            beforeEach(() => {
                enemy = new Enemy(factoryService, fightService);
                mapGrid = TestFactory.create9x9MapGridAround(enemy);
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
                enemy = new Enemy(factoryService, fightService);
                mapGrid = TestFactory.create9x9MapGridAround(enemy);
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
                enemy = new Enemy(factoryService, fightService);
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
