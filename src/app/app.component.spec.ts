import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MapBuilderService } from './services/map-builder.service';
import { MapGrid } from './model/map-grid.model';
import { Direction } from './model/direction.model';
import { UserConsoleService } from './services/user-console.service';
import { EnemySorterService } from './services/enemy-sorter.service';

describe('AppComponent', () => {
  const mockMapGrid = new MapGrid([]);
  const mockMapBuilderService  = { getMapGrid: {} };
  const mockUserConsoleService  = { writeWelcome: {} };
  const mockEnemySorterService = { sort: {} };
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    spyOn(mockMapBuilderService, 'getMapGrid').and.returnValue(mockMapGrid);
    spyOn(mockUserConsoleService, 'writeWelcome');
    spyOn(mockEnemySorterService, 'sort');
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {provide: MapBuilderService, useValue: mockMapBuilderService},
        {provide: UserConsoleService, useValue: mockUserConsoleService},
        {provide: EnemySorterService, useValue: mockEnemySorterService}
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
    expect(compiled.querySelector('h1').textContent).toContain('Welcome to the Dungeon!');
  });

  it('should have initial character', () => {
    const character = component.character;
    expect(character.attack).toBe(1);
    expect(character.defence).toBe(1);
    expect(character.experience).toBe(0);
    expect(character.gold).toBe(0);
    expect(character.health).toBe(10);
    expect(character.level).toBe(1);
  });

  it('should have initial console lines', () => {
    expect(mockUserConsoleService.writeWelcome).toHaveBeenCalled();
  });

  it('should have built map grid', () => {
    expect(component.mapGrid).toBe(mockMapGrid);
  });

  it('should pass character and enemies to grid builder', () => {
    expect(mockMapBuilderService.getMapGrid).toHaveBeenCalledWith(component.character, component.enemies, jasmine.any(Function));
  });

  it('should move character', () => {
    spyOn(component.character, 'act');

    component.actionHandler(Direction.Left);

    expect(component.character.act).toHaveBeenCalledWith(Direction.Left);
  });

  // TODO: refactor async map grid callback to test these:
  // it('should sort enemies', () => {
  //   expect(mockEnemySorterService.sort).toHaveBeenCalledWith(component.enemies, component.character); //must be async
  // });

  // it('should sort enemies after actions', () => {
  //   expect(mockEnemySorterService.sort).toHaveBeenCalledWith(component.enemies, component.character);
  //   spyOn(component.character, 'act');
  //   component.actionHandler(Direction.Left);
  //   expect(mockEnemySorterService.sort).toHaveBeenCalledWith(component.enemies, component.character); //check this second one works
  // });

});
