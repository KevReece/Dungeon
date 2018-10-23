import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharactorComponent } from './charactor.component';
import { Charactor } from '../model/celloccupiers/charactor.model';

describe('CharactorComponent', () => {
  let component: CharactorComponent;
  let fixture: ComponentFixture<CharactorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharactorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharactorComponent);
    component = fixture.componentInstance;
    component.charactor = new Charactor();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
