import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MapBuilderService } from './map-builder.service';
import { MapGrid } from './model/map-grid.model';

describe('AppComponent', () => {
  const mockMapGrid = new MapGrid([]);
  const mockMapBuilderService  = { getMapGrid: {} };

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
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have as title 'Dungeon'`, () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app.title).toEqual('Dungeon');
  });

  it('should render title in a h1 tag', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to Dungeon!');
  });

  it('should have initial charactor', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance.charactor.attack).toBe(1);
    expect(fixture.componentInstance.charactor.defence).toBe(1);
    expect(fixture.componentInstance.charactor.experience).toBe(0);
    expect(fixture.componentInstance.charactor.gold).toBe(0);
    expect(fixture.componentInstance.charactor.health).toBe(10);
    expect(fixture.componentInstance.charactor.level).toBe(1);
  });

  it('should have initial console lines', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance.consoleLines[0]).toContain('Welcome');
  });

  it('should have built map grid', () => {
    const fixture = TestBed.createComponent(AppComponent);
    expect(fixture.componentInstance.mapGrid).toBe(mockMapGrid);
  });
});
