import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MapBuilderService } from './map-builder.service';
import { MapGrid } from './model/map-grid.model';
import { Direction } from './model/direction.model';

describe('AppComponent', () => {
  const mockMapGrid = new MapGrid([]);
  const mockMapBuilderService  = { getMapGrid: {} };
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    spyOn(mockMapBuilderService, 'getMapGrid').and.returnValue(mockMapGrid);
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: MapBuilderService, useValue: mockMapBuilderService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Dungeon'`, () => {
    expect(component.title).toEqual('Dungeon');
  });

  it('should render title in a h1 tag', () => {
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Dungeon!');
  });

  it('should have initial charactor', () => {
    const charactor = component.charactor;
    expect(charactor.attack).toBe(1);
    expect(charactor.defence).toBe(1);
    expect(charactor.experience).toBe(0);
    expect(charactor.gold).toBe(0);
    expect(charactor.health).toBe(10);
    expect(charactor.level).toBe(1);
  });

  it('should have initial console lines', () => {
    expect(component.consoleLines[0]).toContain('Welcome');
  });

  it('should have built map grid', () => {
    expect(component.mapGrid).toBe(mockMapGrid);
  });

  it('should move charactor', () => {
    spyOn(component.charactor, 'act');
    component.actionHandler(Direction.Left);
    expect(component.charactor.act).toHaveBeenCalledWith(Direction.Left);
  });
});
