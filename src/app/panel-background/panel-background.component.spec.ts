import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PanelBackgroundComponent } from './panel-background.component';

describe('PanelBackgroundComponent', () => {
  let component: PanelBackgroundComponent;
  let fixture: ComponentFixture<PanelBackgroundComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PanelBackgroundComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PanelBackgroundComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
