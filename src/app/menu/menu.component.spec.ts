import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MenuComponent } from './menu.component';
import { ConfirmationDialogService } from '../confirmation-dialog/confirmation-dialog.service';

describe('MenuComponent', () => {
  let component: MenuComponent;
  let fixture: ComponentFixture<MenuComponent>;
  let compiled;
  let confirmationDialogService: ConfirmationDialogService;

  beforeEach(async(() => {
    confirmationDialogService = new ConfirmationDialogService(null);
    spyOn(confirmationDialogService, 'confirm').and.returnValue({then: (then) => then(true)});
    TestBed.configureTestingModule({
      declarations: [ MenuComponent ],
      providers: [
        {provide: ConfirmationDialogService, useValue: confirmationDialogService}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    compiled = fixture.debugElement.nativeElement;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should raise restart event if gameover', done => {
    component.isGameOver = true;
    fixture.detectChanges();

    component.restartEvent.subscribe(() => done());

    compiled.querySelector('#RestartButton').click();
    fixture.detectChanges();
  });

  it('should raise restart event if game not over', done => {
    component.isGameOver = false;
    fixture.detectChanges();

    component.restartEvent.subscribe(() => done());

    compiled.querySelector('#RestartButton').click();
    fixture.detectChanges();
  });
});
