import { Charactor } from './charactor.model';
import { Direction } from '../direction.model';
import { MapGrid } from '../map-grid.model';
import { Row } from '../row.model';
import { Cell } from '../cell.model';
import { Wall } from './wall.model';
import { TreasureChest } from './treasure-chest.model';

describe('Charactor', () => {
    let charactor: Charactor;

    beforeEach(() => {
        charactor = new Charactor();
    });

    describe('initializeToCell', () => {
        it('should be getable', () => {
            const cell = new Cell();

            charactor.initializeToCell(cell);

            expect(charactor.getCell()).toBe(cell);
        });
    });

    describe('act', () => {
        it('should move the charactor', () => {
            const mapGrid = new MapGrid([new Row([new Cell(charactor)]), new Row([new Cell()])]);

            charactor.act(Direction.Down);

            expect(charactor.getCell()).toBe(mapGrid.rows[1].cells[0]);
        });

        it('should not move the charactor out of bounds', () => {
            const mapGrid = new MapGrid([new Row([new Cell(charactor)])]);

            charactor.act(Direction.Up);

            expect(charactor.getCell()).toBe(mapGrid.rows[0].cells[0]);
        });

        it('should not move the charactor into occupied cell', () => {
            const mapGrid = new MapGrid([new Row([new Cell(charactor), new Cell(new Wall())])]);

            charactor.act(Direction.Right);

            expect(charactor.getCell()).toBe(mapGrid.rows[0].cells[0]);
        });

        it('should open a treasure chest', () => {
            const treasureChest = new TreasureChest();
            const mapGrid = new MapGrid([new Row([new Cell(charactor), new Cell(treasureChest)])]);
            spyOn(treasureChest, 'open');

            charactor.act(Direction.Right);

            expect(treasureChest.open).toHaveBeenCalled();
        });
    });
});
