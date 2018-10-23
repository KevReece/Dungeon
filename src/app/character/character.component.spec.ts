import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CharacterComponent } from './character.component';
import { Character } from '../model/celloccupiers/character.model';

describe('CharacterComponent', () => {
  let component: CharacterComponent;
  let fixture: ComponentFixture<CharacterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CharacterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CharacterComponent);
    component = fixture.componentInstance;
    component.character = new Character(null);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});