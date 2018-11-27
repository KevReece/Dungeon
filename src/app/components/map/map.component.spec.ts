import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MapComponent } from './map.component';
import { MapGrid } from '../../model/map-grid.model';
import { Row } from '../../model/row.model';
import { Wall } from '../../model/celloccupiers/wall.model';
import { TestFactory } from '../../testhelpers/test-factory';

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
    const holeRow = new Row([TestFactory.createCell(TestFactory.createHole())]);
    return new MapGrid([wallRow, multipleWallRow, floorRow, mixedRow, characterRow, treasureChestRow, goldRow, enemyRow, holeRow]);
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
    const row = getRow(compiled, 1);
    expect(getCellSrcOfRow(row, 1)).toContain('wall');
  });

  it('should render multiple wall cells in row', () => {
    const compiled = fixture.debugElement.nativeElement;
    const row = getRow(compiled, 2);
    expect(getCellSrcOfRow(row, 1)).toContain('wall');
    expect(getCellSrcOfRow(row, 2)).toContain('wall');
  });

  it('should render an empty floor cell', () => {
    const compiled = fixture.debugElement.nativeElement;
    const row = getRow(compiled, 3);
    expect(getCellSrcOfRow(row, 1)).toContain('none');
  });

  it('should render a mixed cells row', () => {
    const compiled = fixture.debugElement.nativeElement;
    const row = getRow(compiled, 4);
    expect(getCellSrcOfRow(row, 1)).toContain('none');
    expect(getCellSrcOfRow(row, 2)).toContain('wall');
    expect(getCellSrcOfRow(row, 3)).toContain('none');
    expect(getCellSrcOfRow(row, 4)).toContain('wall');
  });

  it('should render a character', () => {
    const compiled = fixture.debugElement.nativeElement;
    const row = getRow(compiled, 5);
    expect(getCellSrcOfRow(row, 1)).toContain('character');
  });

  it('should render a treasure chest', () => {
    const compiled = fixture.debugElement.nativeElement;
    const row = getRow(compiled, 6);
    expect(getCellSrcOfRow(row, 1)).toContain('treasureChest');
  });

  it('should render gold item', () => {
    const compiled = fixture.debugElement.nativeElement;
    const row = getRow(compiled, 7);
    expect(getRow(compiled, 7).querySelector('img').getAttribute('src')).toContain('gold');
  });

  it('should render an enemy', () => {
    const compiled = fixture.debugElement.nativeElement;
    const row = getRow(compiled, 8);
    expect(getCellSrcOfRow(row, 1)).toContain('goblin');
  });

  it('should render a treasure chest', () => {
    const compiled = fixture.debugElement.nativeElement;
    const row = getRow(compiled, 9);
    expect(getCellSrcOfRow(row, 1)).toContain('hole');
  });
});

function getRow(compiled: any, numberOfRow: number) {
  return compiled.querySelector('.row:nth-of-type(' + numberOfRow + ')');
}

function getCellSrcOfRow(rowElement: any, numberOfCell: number): any {
  return rowElement.querySelector('.cell:nth-of-type(' + numberOfCell + ') img').getAttribute('src');
}
