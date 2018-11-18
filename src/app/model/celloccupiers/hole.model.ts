import { CellOccupier } from './cell-occupier.model';
import { Character } from './character.model';
import { UserConsoleService } from 'src/app/services/user-console.service';
import { AppComponent } from 'src/app/app.component';

export class Hole extends CellOccupier {

    constructor(
            private appComponent: AppComponent,
            private userConsoleService: UserConsoleService,
            public targetMapLevelNumber: number) {
        super();
     }

    enter(character: Character): void {
        this.userConsoleService.writeHoleEntered(this.targetMapLevelNumber);
        this.appComponent.startMapLevel(this.targetMapLevelNumber);
    }
}
