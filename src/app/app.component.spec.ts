import { TestBed, async, ComponentFixture, fakeAsync, flush, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MapLoaderService } from './services/map-loader.service';
import { Direction } from './model/direction.model';
import { UserConsoleService } from './services/user-console.service';
import { EnemySorterService } from './services/enemy-sorter.service';

describe('AppComponent', () => {
  const mockMapLoaderService  = { loadMapGrid: {} };
  const mockUserConsoleService  = { writeWelcome: {} };
  const mockEnemySorterService = { sort: {} };
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    spyOn(mockMapLoaderService, 'loadMapGrid').and.returnValue(new Promise(() => {}));
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
        {provide: MapLoaderService, useValue: mockMapLoaderService},
        {provide: UserConsoleService, useValue: mockUserConsoleService},
        {provide: EnemySorterService, useValue: mockEnemySorterService}
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(AppComponent);
    component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it(`should have as title 'Dungeon'`, () => {
    expect(component.title).toEqual('Dungeon');
  });

  it('should render title in a h1 tag', () => {
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

  it('should have loaded map grid', () => {
    expect(mockMapLoaderService.loadMapGrid).toHaveBeenCalledWith(component.mapGrid, component.character, component.enemies);
  });

  it('should move character', () => {
    spyOn(component.character, 'act');

    component.actionHandler(Direction.Left);

    expect(component.character.act).toHaveBeenCalledWith(Direction.Left);
  });

  // TODO: I hate promises
  // it('should sort enemies', (done) => {
  //   component.mapLoadPromise.then(() => {
  //     expect(mockEnemySorterService.sort).toHaveBeenCalledWith(component.enemies, component.character);
  //     done();
  //   });
  // });

  it('should sort enemies after actions', () => {
    spyOn(component.character, 'act');
    component.actionHandler(Direction.Left);
    expect(mockEnemySorterService.sort).toHaveBeenCalledWith(component.enemies, component.character);
  });
});
