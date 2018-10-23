import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { MapGrid } from '../model/map-grid.model';
import { Row } from '../model/row.model';
import { Wall } from '../model/wall.model';
import { Cell } from '../model/cell.model';
import { Charactor } from '../model/charactor.model';

describe('MapComponent', () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MapComponent ]
    })
    .compileComponents();
  }));

  const buildTestMapGrid = function() {
    const wallRow = new Row([new Cell(new Wall())]);
    const multipleWallRow = new Row([new Cell(new Wall()), new Cell(new Wall())]);
    const floorRow = new Row([new Cell()]);
    const mixedRow = new Row([new Cell(), new Cell(new Wall()), new Cell(), new Cell(new Wall())]);
    const charactorRow = new Row([new Cell(new Charactor())]);
    return new MapGrid([wallRow, multipleWallRow, floorRow, mixedRow, charactorRow]);
  };

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    component.mapGrid = buildTestMapGrid();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render a wall cell', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('tr:nth-of-type(1)').querySelector('td').textContent).toBe('X');
  });

  it('should render multiple wall cells in row', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('tr:nth-of-type(2)').textContent).toBe('XX');
  });

  it('should render an empty floor cell', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('tr:nth-of-type(3)').querySelector('td').textContent).toBe(' ');
  });

  it('should render a mixed cells row', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('tr:nth-of-type(4)').textContent).toBe(' X X');
  });

  it('should render a charactor', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('tr:nth-of-type(5)').querySelector('td').textContent).toBe('B');
  });
});
