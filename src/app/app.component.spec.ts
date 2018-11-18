import { TestBed, async, ComponentFixture, fakeAsync, flush, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MapLoaderService } from './services/map-loader.service';
import { Direction } from './model/direction.model';
import { UserConsoleService } from './services/user-console.service';
import { EnemySorterService } from './services/enemy-sorter.service';
import { FightService } from './services/fight.service';
import { FactoryService } from './services/factory.service';
import { CharacterLevelUpgradeService } from './services/character-level-upgrade.service';
import { TurnEngineService } from './services/turn-engine.service';
import { ActionOption } from './model/action-option';

describe('AppComponent', () => {
  const mockMapLoaderService  = { loadMapGrid: {} };
  const mockUserConsoleService  = { startAndWelcome: {} };
  const mockEnemySorterService = { sort: {} };
  const mockFightService = { };
  const mockLevelUpgradeService = { initialize: {} };
  const mockTurnEngineService = { initialize: {}, executeTurn: {} };
  const mockFactoryService = new FactoryService();
  const actionOptions = [ActionOption.Move, ActionOption.Move, ActionOption.None, ActionOption.Move];
  let fixture: ComponentFixture<AppComponent>;
  let component: AppComponent;

  beforeEach(async(() => {
    spyOn(mockMapLoaderService, 'loadMapGrid').and.returnValue(new Promise(() => {}));
    spyOn(mockUserConsoleService, 'startAndWelcome');
    spyOn(mockEnemySorterService, 'sort');
    spyOn(mockFactoryService, 'setUpDependencies');
    spyOn(mockLevelUpgradeService, 'initialize');
    spyOn(mockTurnEngineService, 'initialize');
    spyOn(mockTurnEngineService, 'executeTurn').and.returnValue(actionOptions);
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
        {provide: EnemySorterService, useValue: mockEnemySorterService},
        {provide: FightService, useValue: mockFightService},
        {provide: CharacterLevelUpgradeService, useValue: mockLevelUpgradeService},
        {provide: TurnEngineService, useValue: mockTurnEngineService},
        {provide: FactoryService, useValue: mockFactoryService}
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

  describe('constructor', () => {
    it('should setup dependencies for factory service (avoids circular dependencies)', () => {
      expect(mockFactoryService.setUpDependencies).toHaveBeenCalledWith(mockUserConsoleService, mockFightService, mockLevelUpgradeService);
    });
  });

  describe('ngOnInit/restart', () => {
    it('should initialize turn engine with game elements', () => {
      expect(mockTurnEngineService.initialize).toHaveBeenCalledWith(component.character, component.enemies);
    });

    it('should have initial character', () => {
      const character = component.character;

      expect(character.experience).toBe(0);
      expect(mockLevelUpgradeService.initialize).toHaveBeenCalledWith(character);
    });

    it('should have initial console lines', () => {
      expect(mockUserConsoleService.startAndWelcome).toHaveBeenCalled();
    });

    it('should have loaded map grid', () => {
      expect(mockMapLoaderService.loadMapGrid).toHaveBeenCalledWith(1, component.mapGrid, component.character, component.enemies);
      expect(component.mapLevelNumber).toBe(1);
    });

    // TODO: I hate promises
    // it('should sort enemies', (done) => {
    //   component.mapLoadPromise.then(() => {
    //     expect(mockEnemySorterService.sort).toHaveBeenCalledWith(component.enemies, component.character);
    //     done();
    //   });
    // });
    //
    // it('should initialize actionOptions', (done) => {
    //   component.mapLoadPromise.then(() => {
    //     expect(component.character.getActionOptions).toHaveBeenCalled();
    //     expect(component.actionOptions).toBe(actionOptions);
    //     done();
    //   });
    // });
  });

  describe('startMapLevel', () => {
    it('should have loaded map grid', () => {
      component.startMapLevel(2);

      expect(mockMapLoaderService.loadMapGrid).toHaveBeenCalledWith(2, component.mapGrid, component.character, component.enemies);
      expect(component.mapLevelNumber).toBe(2);
    });
  });

  describe('actionHandler', () => {
    it('should executeTurn for charactor', () => {
      component.actionHandler(Direction.Left);

      expect(mockTurnEngineService.executeTurn).toHaveBeenCalledWith(Direction.Left);
      expect(component.actionOptions).toBe(actionOptions);
    });
  });
});
