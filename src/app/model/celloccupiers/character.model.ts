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
import { ActionOption } from '../action-option';
import { Hole } from './hole.model';

export class Character extends Fighter {

    constructor(
            private userConsoleService: UserConsoleService,
            private fightService: FightService,
            private levelUpgradeService: LevelUpgradeService) {
        super();
    }

    name = 'Adventurer';
    level = 1;
    gold = 0;
    experience = 0;
    health = 10;
    maxHealth = 10;
    attack = 1;
    defence = 1;
    damage = 1;

    die(): void {
        this.userConsoleService.writeCharacterDied(this);
    }

    isDead(): boolean {
        return this.health <= 0;
    }

    act(direction: Direction): boolean {
        if (this.isDead()) {
            return false;
        }
        const adjacentCell = this.cell.getAdjacentCell(direction);
        if (adjacentCell) {
            if (!adjacentCell.isOccupied()) {
                adjacentCell.setOccupier(this);
                this.collectItems(adjacentCell);
                return true;
            } else if (adjacentCell.occupier instanceof TreasureChest) {
                adjacentCell.occupier.open();
                return true;
            } else if (adjacentCell.occupier instanceof Enemy) {
                this.fightService.attack(this, adjacentCell.occupier);
                return true;
            } else if (adjacentCell.occupier instanceof Hole) {
                adjacentCell.occupier.enter(this);
                return true;
            }
        }
        return false;
    }

    killedOpponent(enemy: Enemy): void {
        this.userConsoleService.writeExperienceGained(enemy.experienceValue);
        this.experience += enemy.experienceValue;
        this.levelUpgradeService.check(this);
    }

    getActionOptions(): ActionOption[] {
        return [
            this.getActionOption(Direction.Up),
            this.getActionOption(Direction.Right),
            this.getActionOption(Direction.Down),
            this.getActionOption(Direction.Left)
        ];
    }

    private getActionOption(direction: Direction): ActionOption {
        if (this.isDead()) {
            return ActionOption.None;
        }
        if (this.cell.isAdjacentCellOccupied(direction)) {
            const adjacentCell = this.cell.getAdjacentCell(direction);
            return adjacentCell && adjacentCell.occupier instanceof Enemy ? ActionOption.Fight
                : adjacentCell && adjacentCell.occupier instanceof TreasureChest ? ActionOption.Open
                : adjacentCell && adjacentCell.occupier instanceof Hole ? ActionOption.EnterHole
                : ActionOption.None;
        }
        return ActionOption.Move;
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
