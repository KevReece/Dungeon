import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { MapGrid } from '../model/map-grid.model';
import { Row } from '../model/row.model';
import { Wall } from '../model/celloccupiers/wall.model';
import { Cell } from '../model/cell.model';
import { Character } from '../model/celloccupiers/character.model';
import { TreasureChest } from '../model/celloccupiers/treasure-chest.model';
import { Gold } from '../model/cellitems/gold.model';
import { Enemy } from '../model/celloccupiers/enemy.model';
import { TestFactory } from '../testhelpers/test-factory.spec';

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
    const characterRow = new Row([new Cell(TestFactory.createCharacter())]);
    const treasureChestRow = new Row([new Cell(TestFactory.createTreasureChest())]);
    const goldRow = new Row([new Cell()]);
    goldRow.cells[0].items.push(TestFactory.createGold());
    const enemyRow = new Row([new Cell(new Enemy())]);
    return new MapGrid([wallRow, multipleWallRow, floorRow, mixedRow, characterRow, treasureChestRow, goldRow, enemyRow]);
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

  it('should render a character', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('tr:nth-of-type(5)').querySelector('td').textContent).toBe('B');
  });

  it('should render a treasure chest', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('tr:nth-of-type(6)').querySelector('td').textContent).toBe('T');
  });

  it('should render gold item', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('tr:nth-of-type(7)').querySelector('td').textContent).toBe('G');
  });

  it('should render an enemy', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('tr:nth-of-type(8)').querySelector('td').textContent).toBe('E');
  });
});
