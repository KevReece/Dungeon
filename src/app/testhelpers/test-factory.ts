import { Character } from '../model/celloccupiers/character.model';
import { Gold } from '../model/cellitems/gold.model';
import { TreasureChest } from '../model/celloccupiers/treasure-chest.model';
import { FactoryService } from '../services/factory.service';
import { Enemy } from '../model/celloccupiers/enemy.model';
import { CellOccupier } from '../model/celloccupiers/cell-occupier.model';
import { MapGrid } from '../model/map-grid.model';
import { Row } from '../model/row.model';
import { Cell } from '../model/cell.model';

export class TestFactory {
    static createCharacter(): Character {
        return new Character(null, null, null);
    }
    static createEnemy(): Enemy {
        return new Enemy(new FactoryService());
    }
    static createGold(): Gold {
        const mockFactoryService = new FactoryService();
        spyOn(mockFactoryService, 'createRandomInteger').and.returnValue(1);
        return new Gold(mockFactoryService);
    }
    static createTreasureChest(): TreasureChest {
        return new TreasureChest(null, null);
    }
    static create9x9MapGridAround(occupier: CellOccupier): MapGrid {
        return new MapGrid([
            new Row([new Cell(), new Cell(), new Cell()]),
            new Row([new Cell(), new Cell(occupier), new Cell()]),
            new Row([new Cell(), new Cell(), new Cell()])
        ]);
    }
}
