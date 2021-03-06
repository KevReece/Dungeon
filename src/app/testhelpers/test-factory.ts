import { Character } from '../model/celloccupiers/character.model';
import { Gold } from '../model/cellitems/gold.model';
import { TreasureChest } from '../model/celloccupiers/treasure-chest.model';
import { FactoryService } from '../services/factory.service';
import { CellOccupier } from '../model/celloccupiers/cell-occupier.model';
import { MapGrid } from '../model/map-grid.model';
import { Row } from '../model/row.model';
import { Cell } from '../model/cell.model';
import { Hole } from '../model/celloccupiers/hole.model';
import { Food } from '../model/cellitems/food.model';
import { Goblin } from '../model/celloccupiers/enemies/goblin.model';
import { Orc } from '../model/celloccupiers/enemies/orc.model';
import { AppComponent } from '../app.component';

export class TestFactory {
    static createAppComponent(): AppComponent {
        return new AppComponent(null, new FactoryService(), null, null, null, null, null, null);
    }
    static createCharacter(): Character {
        return new Character(null, null, null);
    }
    static createGoblin(): Goblin {
        return new Goblin(new FactoryService(), null, null);
    }
    static createOrc(): Orc {
        return new Orc(new FactoryService(), null, null);
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
    static createMapGrid(rows?: Row[], factoryService?: FactoryService): MapGrid {
        return new MapGrid(factoryService, rows || []);
    }
    static create1x1MapGrid(occupier?: CellOccupier, factoryService?: FactoryService): MapGrid {
        return this.createMapGrid([new Row([this.createCell(occupier)])], factoryService);
    }
    static create9x9MapGrid(centreOccupier?: CellOccupier, factoryService?: FactoryService): MapGrid {
        return this.createMapGrid([
            new Row([this.createCell(), this.createCell(), this.createCell()]),
            new Row([this.createCell(), this.createCell(centreOccupier), this.createCell()]),
            new Row([this.createCell(), this.createCell(), this.createCell()])
        ], factoryService);
    }
    static createHole(): Hole {
        return new Hole(null, null, 0);
    }
}
