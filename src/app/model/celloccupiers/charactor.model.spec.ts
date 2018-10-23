import { Charactor } from './charactor.model';
import { Direction } from '../direction.model';
import { MapGrid } from '../map-grid.model';
import { Row } from '../row.model';
import { Cell } from '../cell.model';
import { Wall } from './wall.model';
import { TreasureChest } from './treasure-chest.model';
import { Gold } from '../cellitems/gold.model';
import { UserConsoleService } from 'src/app/services/user-console.service';
import { Enemy } from './enemy.model';

describe('Charactor', () => {
    let charactor: Charactor;
    let mockUserConsoleService: UserConsoleService;

    beforeEach(() => {
        mockUserConsoleService = new UserConsoleService();
        spyOn(mockUserConsoleService, 'writeItemsCollected');
        charactor = new Charactor(mockUserConsoleService);
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
            const treasureChest = new TreasureChest(null);
            const mapGrid = new MapGrid([new Row([new Cell(charactor), new Cell(treasureChest)])]);
            spyOn(treasureChest, 'open');

            charactor.act(Direction.Right);

            expect(treasureChest.open).toHaveBeenCalled();
        });

        it('should collect gold', () => {
            const gold = new Gold();
            const newCell = new Cell();
            newCell.items.push(gold);
            const mapGrid = new MapGrid([new Row([new Cell(charactor), newCell])]);

            charactor.act(Direction.Right);

            expect(charactor.gold).toEqual(gold.quantity);
            expect(newCell.items.length).toEqual(0);
        });

        it('should raise items collected console message', () => {
            const gold = new Gold();
            const newCell = new Cell();
            newCell.items.push(gold);
            const mapGrid = new MapGrid([new Row([new Cell(charactor), newCell])]);

            charactor.act(Direction.Right);

            expect(mockUserConsoleService.writeItemsCollected).toHaveBeenCalled();
        });

        it('shouldn\'t raise items collected console message for no items', () => {
            const gold = new Gold();
            const newCell = new Cell();
            const mapGrid = new MapGrid([new Row([new Cell(charactor), newCell])]);

            charactor.act(Direction.Right);

            expect(mockUserConsoleService.writeItemsCollected).not.toHaveBeenCalled();
        });
    });
});
