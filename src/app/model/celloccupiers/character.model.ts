import { CellOccupier } from './cell-occupier.model';
import { Direction } from '../direction.model';
import { TreasureChest } from './treasure-chest.model';
import { UserConsoleService } from 'src/app/services/user-console.service';
import { Cell } from '../cell.model';
import { Gold } from '../cellitems/gold.model';
import { FightService } from 'src/app/services/fight.service';
import { Enemy } from './enemy.model';
import { Fighter } from './fighter.model';
import { LevelUpgradeService } from 'src/app/services/level-upgrade.service';

export class Character extends Fighter {

    constructor(
            private userConsoleService: UserConsoleService,
            private fightService: FightService,
            private levelUpgradeService: LevelUpgradeService) {
        super();
    }

    level = 1;
    gold = 0;
    experience = 0;
    health = 10;
    maxHealth = 10;
    attack = 1;
    defence = 1;
    damage = 1;

    act(direction: Direction) {
        const adjacentCell = this.cell.getAdjacentCell(direction);
        if (adjacentCell) {
            if (!adjacentCell.isOccupied()) {
                adjacentCell.setOccupier(this);
                this.collectItems(adjacentCell);
            } else if (adjacentCell.occupier instanceof TreasureChest) {
                (<TreasureChest>adjacentCell.occupier).open();
            } else if (adjacentCell.occupier instanceof Enemy) {
                this.fightService.attack(this, adjacentCell.occupier);
            }
        }
    }

    killedOpponent(enemy: Enemy): void {
        this.userConsoleService.writeExperienceGained(enemy.experienceValue);
        this.experience += enemy.experienceValue;
        this.levelUpgradeService.check(this);
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
