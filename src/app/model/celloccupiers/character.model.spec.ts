import { Character } from './character.model';
import { Direction } from '../direction.model';
import { MapGrid } from '../map-grid.model';
import { Row } from '../row.model';
import { Cell } from '../cell.model';
import { Wall } from './wall.model';
import { TreasureChest } from './treasure-chest.model';
import { Gold } from '../cellitems/gold.model';
import { UserConsoleService } from 'src/app/services/user-console.service';
import { Enemy } from './enemy.model';

describe('Character', () => {
    let character: Character;
    let mockUserConsoleService: UserConsoleService;

    beforeEach(() => {
        mockUserConsoleService = new UserConsoleService();
        spyOn(mockUserConsoleService, 'writeItemsCollected');
        character = new Character(mockUserConsoleService);
    });

    describe('initializeToCell', () => {
        it('should be getable', () => {
            const cell = new Cell();

            character.initializeToCell(cell);

            expect(character.getCell()).toBe(cell);
        });
    });

    describe('act', () => {
        it('should move the character', () => {
            const mapGrid = new MapGrid([new Row([new Cell(character)]), new Row([new Cell()])]);

            character.act(Direction.Down);

            expect(character.getCell()).toBe(mapGrid.rows[1].cells[0]);
        });

        it('should not move the character out of bounds', () => {
            const mapGrid = new MapGrid([new Row([new Cell(character)])]);

            character.act(Direction.Up);

            expect(character.getCell()).toBe(mapGrid.rows[0].cells[0]);
        });

        it('should not move the character into occupied cell', () => {
            const mapGrid = new MapGrid([new Row([new Cell(character), new Cell(new Wall())])]);

            character.act(Direction.Right);

            expect(character.getCell()).toBe(mapGrid.rows[0].cells[0]);
        });

        it('should open a treasure chest', () => {
            const treasureChest = new TreasureChest(null);
            const mapGrid = new MapGrid([new Row([new Cell(character), new Cell(treasureChest)])]);
            spyOn(treasureChest, 'open');

            character.act(Direction.Right);

            expect(treasureChest.open).toHaveBeenCalled();
        });

        it('should collect gold', () => {
            const gold = new Gold();
            const newCell = new Cell();
            newCell.items.push(gold);
            const mapGrid = new MapGrid([new Row([new Cell(character), newCell])]);

            character.act(Direction.Right);

            expect(character.gold).toEqual(gold.quantity);
            expect(newCell.items.length).toEqual(0);
        });

        it('should raise items collected console message', () => {
            const gold = new Gold();
            const newCell = new Cell();
            newCell.items.push(gold);
            const mapGrid = new MapGrid([new Row([new Cell(character), newCell])]);

            character.act(Direction.Right);

            expect(mockUserConsoleService.writeItemsCollected).toHaveBeenCalled();
        });

        it('shouldn\'t raise items collected console message for no items', () => {
            const gold = new Gold();
            const newCell = new Cell();
            const mapGrid = new MapGrid([new Row([new Cell(character), newCell])]);

            character.act(Direction.Right);

            expect(mockUserConsoleService.writeItemsCollected).not.toHaveBeenCalled();
        });
    });
});
