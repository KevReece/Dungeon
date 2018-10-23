import { CellOccupier } from './cell-occupier.model';
import { Direction } from '../direction.model';
import { TreasureChest } from './treasure-chest.model';
import { FactoryService } from 'src/app/services/factory.service';
import { UserConsoleService } from 'src/app/services/user-console.service';
import { Cell } from '../cell.model';
import { Gold } from '../cellitems/gold.model';
import { Enemy } from './enemy.model';

export class Charactor extends CellOccupier {

    constructor(protected factoryService: FactoryService, private userConsoleService: UserConsoleService) {
        super(factoryService);
    }

    level = 1;
    gold = 0;
    experience = 0;
    health = 10;
    attack = 1;
    defence = 1;

    act(direction: Direction) {
        const adjacentCell = this.cell.getAdjacentCell(direction);
        if (adjacentCell) {
            if (!adjacentCell.isOccupied()) {
                adjacentCell.setOccupier(this);
                this.collectItems(adjacentCell);
            } else if (adjacentCell.occupier instanceof TreasureChest) {
                (<TreasureChest>adjacentCell.occupier).open();
            }
        }
    }

    private collectItems(cell: Cell): void {
        if (cell.items.length === 0) {
            return;
        }
        this.userConsoleService.writeItemsCollected(cell.items);
        cell.items.forEach(item => {
            if (item instanceof Gold) {
                this.gold += item.quantity;
            }
        });
        cell.items = [];
    }
}
