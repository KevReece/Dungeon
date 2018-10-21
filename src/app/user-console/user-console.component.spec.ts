import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserConsoleComponent } from './user-console.component';

describe('UserConsoleComponent', () => {
  let component: UserConsoleComponent;
  let fixture: ComponentFixture<UserConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserConsoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserConsoleComponent);
    component = fixture.componentInstance;
    component.lines = []
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
