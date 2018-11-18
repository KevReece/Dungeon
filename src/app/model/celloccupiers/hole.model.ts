import { CellOccupier } from './cell-occupier.model';
import { Character } from './character.model';
import { UserConsoleService } from 'src/app/services/user-console.service';

export class Hole extends CellOccupier {

    targetMapLevelNumber: number;

    constructor(private userConsoleService: UserConsoleService, targetMapLevelNumber: number) {
        super();
        this.targetMapLevelNumber = targetMapLevelNumber;
     }

    enter(character: Character): void {
        this.userConsoleService.writeHoleEntered(this.targetMapLevelNumber);
    }
}
