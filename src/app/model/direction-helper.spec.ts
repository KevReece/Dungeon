import { DirectionHelper } from './direction-helper';
import { Direction } from './direction.model';


describe('DirectionHelper', () => {
    describe('RotateLeft', () => {
        it('should be anticlockwise', () => {
            expect(DirectionHelper.RotateLeft(Direction.Right)).toBe(Direction.Up);
        });

        it('should be left from up', () => {
            expect(DirectionHelper.RotateLeft(Direction.Up)).toBe(Direction.Left);
        });
    });

    describe('RotateRight', () => {
        it('should be clockwise', () => {
            expect(DirectionHelper.RotateRight(Direction.Up)).toBe(Direction.Right);
        });

        it('should be up from left', () => {
            expect(DirectionHelper.RotateRight(Direction.Left)).toBe(Direction.Up);
        });
    });

    describe('Opposite', () => {
        it('should be opposite', () => {
            expect(DirectionHelper.Opposite(Direction.Up)).toBe(Direction.Down);
        });

        it('should be right from left', () => {
            expect(DirectionHelper.Opposite(Direction.Left)).toBe(Direction.Right);
        });
    });
});
