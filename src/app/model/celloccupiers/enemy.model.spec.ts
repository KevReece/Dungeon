import { Enemy } from './enemy.model';
import { Cell } from '../cell.model';
import { MapGrid } from '../map-grid.model';
import { Row } from '../row.model';
import { FactoryService } from 'src/app/services/factory.service';
import { Direction } from '../direction.model';
import { TestFactory } from 'src/app/testhelpers/test-factory';
import { SpyExtensions } from 'src/app/testhelpers/spy-extensions';

describe('Enemy', () => {
    let enemy: Enemy;
    let factoryService: FactoryService;
    let createRandomIntegerResponses: number[];

    beforeEach(() => {
        createRandomIntegerResponses = [0];
        factoryService = new FactoryService();
        spyOn(factoryService, 'createRandomInteger')
          .and.callFake(SpyExtensions.returnValuesAs(createRandomIntegerResponses));
    });

    describe('constructor', () => {
        it('should set the direction', () => {
            createRandomIntegerResponses[0] = 3;

            enemy = new Enemy(factoryService);

            expect(enemy.direction).toBe(Direction.Left);
        });
    });

    describe('die', () => {
        it('should clear the cell occupation', () => {
            enemy = new Enemy(factoryService);
            const cell = new Cell(enemy);
            expect(enemy.cell.occupier).not.toBeNull();

            enemy.die();

            expect(enemy.cell.occupier).toBeNull();
        });
    });

    describe('act', () => {
        describe(' from an upward start direction', () => {
            beforeEach(() => {
                enemy = new Enemy(factoryService);
            });

            it('should get random 1 to 10 for movement', () => {
                const mapGrid = new MapGrid([new Row([new Cell()]), new Row([new Cell(enemy)])]);
                createRandomIntegerResponses[1] = 4;

                enemy.act();

                expect(factoryService.createRandomInteger).toHaveBeenCalledWith(1, 10);
            });

            it('should move forward', () => {
                const mapGrid = new MapGrid([new Row([new Cell()]), new Row([new Cell(enemy)])]);
                createRandomIntegerResponses[1] = 4;

                enemy.act();

                expect(enemy.getCell()).toBe(mapGrid.rows[0].cells[0]);
                expect(enemy.direction).toBe(Direction.Up);
            });

            it('should turn right', () => {
                const mapGrid = new MapGrid([new Row([new Cell(enemy), new Cell()])]);
                createRandomIntegerResponses[1] = 6;

                enemy.act();

                expect(enemy.getCell()).toBe(mapGrid.rows[0].cells[1]);
                expect(enemy.direction).toBe(Direction.Right);
            });

            it('should turn left', () => {
                const mapGrid = new MapGrid([new Row([new Cell(), new Cell(enemy)])]);
                createRandomIntegerResponses[1] = 8;

                enemy.act();

                expect(enemy.getCell()).toBe(mapGrid.rows[0].cells[0]);
                expect(enemy.direction).toBe(Direction.Left);
            });

            it('should move backwards', () => {
                const mapGrid = new MapGrid([new Row([new Cell(enemy)]), new Row([new Cell()])]);
                createRandomIntegerResponses[1] = 9;

                enemy.act();

                expect(enemy.getCell()).toBe(mapGrid.rows[1].cells[0]);
                expect(enemy.direction).toBe(Direction.Down);
            });

            it('should stay still', () => {
                const mapGrid = new MapGrid([new Row([new Cell(enemy), new Cell()])]);
                createRandomIntegerResponses[1] = 10;

                enemy.act();

                expect(enemy.getCell()).toBe(mapGrid.rows[0].cells[0]);
                expect(enemy.direction).toBe(Direction.Up);
            });
        });

        describe(' from a downward start direction', () => {
            beforeEach(() => {
                createRandomIntegerResponses[0] = 2;
                enemy = new Enemy(factoryService);
            });

            it('should move forward', () => {
                const mapGrid = TestFactory.create9x9MapGridAround(enemy);
                createRandomIntegerResponses[1] = 4;

                enemy.act();

                expect(enemy.getCell()).toBe(mapGrid.rows[2].cells[1]);
                expect(enemy.direction).toBe(Direction.Down);
            });

            it('should turn right', () => {
                const mapGrid = TestFactory.create9x9MapGridAround(enemy);
                createRandomIntegerResponses[1] = 6;

                enemy.act();

                expect(enemy.getCell()).toBe(mapGrid.rows[1].cells[0]);
                expect(enemy.direction).toBe(Direction.Left);
            });

            it('should turn left', () => {
                const mapGrid = TestFactory.create9x9MapGridAround(enemy);
                createRandomIntegerResponses[1] = 8;

                enemy.act();

                expect(enemy.getCell()).toBe(mapGrid.rows[1].cells[2]);
                expect(enemy.direction).toBe(Direction.Right);
            });

            it('should move backwards', () => {
                const mapGrid = TestFactory.create9x9MapGridAround(enemy);
                createRandomIntegerResponses[1] = 9;

                enemy.act();

                expect(enemy.getCell()).toBe(mapGrid.rows[0].cells[1]);
                expect(enemy.direction).toBe(Direction.Up);
            });

            it('should stay still', () => {
                const mapGrid = TestFactory.create9x9MapGridAround(enemy);
                createRandomIntegerResponses[1] = 10;

                enemy.act();

                expect(enemy.getCell()).toBe(mapGrid.rows[1].cells[1]);
                expect(enemy.direction).toBe(Direction.Down);
            });
        });
    });
});
