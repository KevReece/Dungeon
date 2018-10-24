import { Fighter } from './fighter.model';
import { Enemy } from './enemy.model';

describe('Fighter', () => {
    let fighter: Fighter;

    beforeEach(() => {
        fighter = new Enemy();
    });

    describe('isAlive', () => {
        it('should be true if healthly', () => {
            fighter.health = 1;

            expect(fighter.isAlive()).toBeTruthy();
        });

        it('should be false if health-less', () => {
            fighter.health = 0;

            expect(fighter.isAlive()).toBeFalsy();
        });
    });

    describe('takeDamage', () => {
        it('should reduce health', () => {
            fighter.takeDamage(1);

            expect(fighter.health).toEqual(1);
        });

        it('should kill fighter', () => {
            spyOn(fighter, 'die');

            fighter.takeDamage(3);

            expect(fighter.health).toEqual(0);
            expect(fighter.die).toHaveBeenCalled();
        });
    });
});
