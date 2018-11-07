import { Enemy } from './enemy.model';
import { Cell } from '../cell.model';
import { MapGrid } from '../map-grid.model';
import { Row } from '../row.model';

describe('Fighter', () => {
    let enemy: Enemy;

    beforeEach(() => {
        enemy = new Enemy();
    });

    describe('die', () => {
        it('should clear the cell occupation', () => {
            new Cell(enemy);
            expect(enemy.cell.occupier).not.toBeNull();

            enemy.die();

            expect(enemy.cell.occupier).toBeNull();
        });
    });

    describe('act', () => {
        it('should move the enemy up', () => {
            const mapGrid = new MapGrid([new Row([new Cell()]), new Row([new Cell(enemy)])]);

            enemy.act();

            expect(enemy.getCell()).toBe(mapGrid.rows[0].cells[0]);
        });
    });
});
