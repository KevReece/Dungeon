import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ControllerComponent } from './controller.component';
import { Direction } from '../model/direction.model';

describe('ControllerComponent', () => {
  let component: ControllerComponent;
  let fixture: ComponentFixture<ControllerComponent>;
  let compiled;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ControllerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ControllerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
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
