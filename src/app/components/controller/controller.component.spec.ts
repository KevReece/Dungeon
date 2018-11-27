import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerComponent } from './controller.component';
import { Direction } from '../../model/direction.model';
import { ActionOption } from '../../model/action-option';

describe('ControllerComponent', () => {
  let component: ControllerComponent;
  let fixture: ComponentFixture<ControllerComponent>;
  let compiled;

  describe('integration', () => {
    beforeEach(async(() => {
      TestBed.configureTestingModule({
        declarations: [ ControllerComponent ]
      })
      .compileComponents();
    }));

    beforeEach(() => {
      fixture = TestBed.createComponent(ControllerComponent);
      component = fixture.componentInstance;
      component.actionOptions = [ActionOption.Move, ActionOption.Move, ActionOption.Move, ActionOption.Move];
      fixture.detectChanges();
      compiled = fixture.debugElement.nativeElement;
    });

    it('should create', () => {
      expect(component).toBeTruthy();
    });

    describe('clickHandler', () => {
      it('should raise up move event', done => {
        component.actionEvent.subscribe(direction => {
          expect(direction).toEqual(Direction.Up);
          done();
        });
        compiled.querySelector('#UpButton').click();
        fixture.detectChanges();
      });

      it('should raise right move event', done => {
        component.actionEvent.subscribe(direction => {
          expect(direction).toEqual(Direction.Right);
          done();
        });
        compiled.querySelector('#RightButton').click();
        fixture.detectChanges();
      });

      it('should raise down move event', done => {
        component.actionEvent.subscribe(direction => {
          expect(direction).toEqual(Direction.Down);
          done();
        });
        compiled.querySelector('#DownButton').click();
        fixture.detectChanges();
      });

      it('should raise left move event', done => {
        component.actionEvent.subscribe(direction => {
          expect(direction).toEqual(Direction.Left);
          done();
        });
        compiled.querySelector('#LeftButton').click();
        fixture.detectChanges();
      });
    });
  });

  describe('isolated', () => {
    describe('getActionName', () => {
      beforeEach(() => {
        component = new ControllerComponent();
      });

      it('should return fight action', () => {
        component.actionOptions[0] = ActionOption.Fight;

        const name = component.getActionName(Direction.Up);

        expect(name).toBe('fight');
      });

      it('should return open action', () => {
        component.actionOptions[0] = ActionOption.Open;

        const name = component.getActionName(Direction.Up);

        expect(name).toBe('open');
      });

      it('should return none action', () => {
        component.actionOptions[0] = ActionOption.None;

        const name = component.getActionName(Direction.Up);

        expect(name).toBe('none');
      });

      it('should return move up action', () => {
        component.actionOptions[0] = ActionOption.Move;

        const name = component.getActionName(Direction.Up);

        expect(name).toBe('moveUp');
      });

      it('should return move left action', () => {
        component.actionOptions[3] = ActionOption.Move;

        const name = component.getActionName(Direction.Left);

        expect(name).toBe('moveLeft');
      });
    });
  });
});
