import { Character } from '../model/celloccupiers/character.model';
import { Gold } from '../model/cellitems/gold.model';
import { TreasureChest } from '../model/celloccupiers/treasure-chest.model';
import { FactoryService } from '../services/factory.service';
import { Enemy } from '../model/celloccupiers/enemy.model';
import { CellOccupier } from '../model/celloccupiers/cell-occupier.model';
import { MapGrid } from '../model/map-grid.model';
import { Row } from '../model/row.model';
import { Cell } from '../model/cell.model';
import { Hole } from '../model/celloccupiers/hole.model';
import { Food } from '../model/cellitems/food.model';

export class TestFactory {
    static createCharacter(): Character {
        return new Character(null, null, null);
    }
    static createEnemy(): Enemy {
        return new Enemy(new FactoryService(), null, null);
    }
    static createGold(): Gold {
        const mockFactoryService = new FactoryService();
        spyOn(mockFactoryService, 'createRandomInteger').and.returnValue(1);
        return new Gold(mockFactoryService);
    }
    static createFood(): Food {
        return new Food();
    }
    static createTreasureChest(): TreasureChest {
        return new TreasureChest(null, null);
    }
    static createCell(occupier?: CellOccupier): Cell {
        return new Cell(occupier);
    }
    static create9x9MapGrid(centreOccupier?: CellOccupier): MapGrid {
        return new MapGrid([
            new Row([this.createCell(), this.createCell(), this.createCell()]),
            new Row([this.createCell(), this.createCell(centreOccupier), this.createCell()]),
            new Row([this.createCell(), this.createCell(), this.createCell()])
        ]);
    }
    static createHole(): Hole {
        return new Hole(null, null, 0);
    }
}
