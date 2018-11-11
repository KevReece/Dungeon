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
import { TestFactory } from '../testhelpers/test-factory';

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
    const wallRow = new Row([TestFactory.createCell(new Wall())]);
    const multipleWallRow = new Row([TestFactory.createCell(new Wall()), TestFactory.createCell(new Wall())]);
    const floorRow = new Row([TestFactory.createCell()]);
    const mixedRow = new Row([TestFactory.createCell(), TestFactory.createCell(new Wall()), TestFactory.createCell(),
      TestFactory.createCell(new Wall())]);
    const characterRow = new Row([TestFactory.createCell(TestFactory.createCharacter())]);
    const treasureChestRow = new Row([TestFactory.createCell(TestFactory.createTreasureChest())]);
    const goldRow = new Row([TestFactory.createCell()]);
    goldRow.cells[0].items.push(TestFactory.createGold());
    const enemyRow = new Row([TestFactory.createCell(TestFactory.createEnemy())]);
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
    expect(compiled.querySelector('tr:nth-of-type(1)').querySelector('img').getAttribute('src')).toContain('wall');
  });

  it('should render multiple wall cells in row', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('tr:nth-of-type(2)').querySelector('td:nth-of-type(1) img').getAttribute('src')).toContain('wall');
    expect(compiled.querySelector('tr:nth-of-type(2)').querySelector('td:nth-of-type(2) img').getAttribute('src')).toContain('wall');
  });

  it('should render an empty floor cell', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('tr:nth-of-type(3)').querySelector('img').getAttribute('src')).toContain('none');
  });

  it('should render a mixed cells row', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('tr:nth-of-type(4)').querySelector('td:nth-of-type(1) img').getAttribute('src')).toContain('none');
    expect(compiled.querySelector('tr:nth-of-type(4)').querySelector('td:nth-of-type(2) img').getAttribute('src')).toContain('wall');
    expect(compiled.querySelector('tr:nth-of-type(4)').querySelector('td:nth-of-type(3) img').getAttribute('src')).toContain('none');
    expect(compiled.querySelector('tr:nth-of-type(4)').querySelector('td:nth-of-type(4) img').getAttribute('src')).toContain('wall');
  });

  it('should render a character', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('tr:nth-of-type(5)').querySelector('img').getAttribute('src')).toContain('character');
  });

  it('should render a treasure chest', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('tr:nth-of-type(6)').querySelector('img').getAttribute('src')).toContain('treasureChest');
  });

  it('should render gold item', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('tr:nth-of-type(7)').querySelector('img').getAttribute('src')).toContain('gold');
  });

  it('should render an enemy', () => {
    const compiled = fixture.debugElement.nativeElement;
    expect(compiled.querySelector('tr:nth-of-type(8)').querySelector('img').getAttribute('src')).toContain('goblin');
  });
});
