import { Character } from '../model/celloccupiers/character.model';
import { Gold } from '../model/cellitems/gold.model';
import { TreasureChest } from '../model/celloccupiers/treasure-chest.model';
import { FactoryService } from '../services/factory.service';

export class TestFactory {
    static createCharacter(): Character {
        return new Character(null, null);
    }
    static createGold(): Gold {
        const mockFactoryService = new FactoryService();
        spyOn(mockFactoryService, 'createRandomInteger').and.returnValue(1);
        return new Gold(mockFactoryService);
    }
    static createTreasureChest(): TreasureChest {
        return new TreasureChest(null, null);
    }
}
