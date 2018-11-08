import { DirectionHelper } from './direction-helper';
import { Direction } from './direction.model';


describe('DirectionHelper', () => {
    describe('RotateLeft', () => {
        it('should be anticlockwise', () => {
            expect(DirectionHelper.rotateLeft(Direction.Right)).toBe(Direction.Up);
        });

        it('should be left from up', () => {
            expect(DirectionHelper.rotateLeft(Direction.Up)).toBe(Direction.Left);
        });
    });

    describe('RotateRight', () => {
        it('should be clockwise', () => {
            expect(DirectionHelper.rotateRight(Direction.Up)).toBe(Direction.Right);
        });

        it('should be up from left', () => {
            expect(DirectionHelper.rotateRight(Direction.Left)).toBe(Direction.Up);
        });
    });

    describe('Opposite', () => {
        it('should be opposite', () => {
            expect(DirectionHelper.opposite(Direction.Up)).toBe(Direction.Down);
        });

        it('should be right from left', () => {
            expect(DirectionHelper.opposite(Direction.Left)).toBe(Direction.Right);
        });
    });
});
