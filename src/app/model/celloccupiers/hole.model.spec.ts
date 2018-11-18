import { Hole } from './hole.model';
import { TestFactory } from 'src/app/testhelpers/test-factory';
import { UserConsoleService } from 'src/app/services/user-console.service';

describe('Hole', () => {
    let hole: Hole;
    let userConsoleService: UserConsoleService;

    beforeEach(() => {
        userConsoleService = new UserConsoleService();
        spyOn(userConsoleService, 'writeHoleEntered');
        hole = new Hole(userConsoleService, 5);
    });

    describe('enter', () => {
        it('should write to console', () => {
            hole.enter(TestFactory.createCharacter());

            expect(userConsoleService.writeHoleEntered).toHaveBeenCalledWith(5);
        });
    });
});
