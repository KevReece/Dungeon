import { Hole } from './hole.model';
import { TestFactory } from 'src/app/testhelpers/test-factory';
import { UserConsoleService } from 'src/app/services/user-console.service';
import { AppComponent } from 'src/app/app.component';
import { FactoryService } from 'src/app/services/factory.service';

describe('Hole', () => {
    let hole: Hole;
    let userConsoleService: UserConsoleService;
    let appComponent: AppComponent;

    beforeEach(() => {
        userConsoleService = new UserConsoleService();
        appComponent = TestFactory.createAppComponent();
        spyOn(userConsoleService, 'writeHoleEntered');
        spyOn(appComponent, 'startMapLevel');
        hole = new Hole(appComponent, userConsoleService, 5);
    });

    describe('enter', () => {
        it('should write to console', () => {
            hole.enter(TestFactory.createCharacter());

            expect(userConsoleService.writeHoleEntered).toHaveBeenCalledWith(5);
        });

        it('should move the app to the next level', () => {
            hole.enter(TestFactory.createCharacter());

            expect(appComponent.startMapLevel).toHaveBeenCalledWith(5);
        });
    });
});
