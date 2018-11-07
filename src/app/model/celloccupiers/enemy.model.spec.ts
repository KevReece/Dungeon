import { Enemy } from './enemy.model';
import { Cell } from '../cell.model';
import { MapGrid } from '../map-grid.model';
import { Row } from '../row.model';
import { FactoryService } from 'src/app/services/factory.service';
import { Direction } from '../direction.model';

describe('Enemy', () => {
    let enemy: Enemy;
    let factoryService: FactoryService;

    beforeEach(() => {
        factoryService = new FactoryService();
    });

    describe('constructor', () => {
        it('should set the direction', () => {
            spyOn(factoryService, 'createRandomInteger').and.returnValue(3);

            enemy = new Enemy(factoryService);

            expect(enemy.direction).toBe(Direction.Left);
        });
    });

    describe('die', () => {
        it('should clear the cell occupation', () => {
            enemy = new Enemy(factoryService);
            new Cell(enemy);
            expect(enemy.cell.occupier).not.toBeNull();

            enemy.die();

            expect(enemy.cell.occupier).toBeNull();
        });
    });

    describe('act', () => {
        beforeEach(() => {
            enemy = new Enemy(factoryService);
        });

        it('should move forward', () => {
            const mapGrid = new MapGrid([new Row([new Cell()]), new Row([new Cell(enemy)])]);
            spyOn(factoryService, 'createRandomInteger').and.returnValue(4);

            enemy.act();

            expect(enemy.getCell()).toBe(mapGrid.rows[0].cells[0]);
        });

        it('should turn right', () => {
            const mapGrid = new MapGrid([new Row([new Cell(enemy), new Cell()])]);
            spyOn(factoryService, 'createRandomInteger').and.returnValue(6);

            enemy.act();

            expect(enemy.getCell()).toBe(mapGrid.rows[0].cells[1]);
        });

        it('should turn left', () => {
            const mapGrid = new MapGrid([new Row([new Cell(), new Cell(enemy)])]);
            spyOn(factoryService, 'createRandomInteger').and.returnValue(8);

            enemy.act();

            expect(enemy.getCell()).toBe(mapGrid.rows[0].cells[0]);
        });

        it('should move backwards', () => {
            const mapGrid = new MapGrid([new Row([new Cell(enemy)]), new Row([new Cell()])]);
            spyOn(factoryService, 'createRandomInteger').and.returnValue(9);

            enemy.act();

            expect(enemy.getCell()).toBe(mapGrid.rows[1].cells[0]);
        });

        it('should stay still', () => {
            const mapGrid = new MapGrid([new Row([new Cell(enemy), new Cell()])]);
            spyOn(factoryService, 'createRandomInteger').and.returnValue(10);

            enemy.act();

            expect(enemy.getCell()).toBe(mapGrid.rows[0].cells[0]);
        });
    });
});
