import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserConsoleComponent } from './components/user-console/user-console.component';
import { CharacterComponent } from './components/character/character.component';
import { MapComponent } from './components/map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { MapLoaderService } from './services/map-loader.service';
import { ControllerComponent } from './components/controller/controller.component';
import { FactoryService } from './services/factory.service';
import { UserConsoleService } from './services/user-console.service';
import { EnemiesComponent } from './components/enemies/enemies.component';
import { EnemySorterService } from './services/enemy-sorter.service';
import { FightService } from './services/fight.service';
import { MenuComponent } from './components/menu/menu.component';
import { ConfirmationDialogComponent } from './components/confirmation-dialog/confirmation-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogService } from './components/confirmation-dialog/confirmation-dialog.service';
import { PanelBackgroundComponent } from './components/panel-background/panel-background.component';

@NgModule({
  declarations: [
    AppComponent,
    UserConsoleComponent,
    CharacterComponent,
    MapComponent,
    ControllerComponent,
    EnemiesComponent,
    MenuComponent,
    ConfirmationDialogComponent,
    PanelBackgroundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule
  ],
  providers: [
    MapLoaderService,
    FactoryService,
    UserConsoleService,
    EnemySorterService,
    FightService,
    ConfirmationDialogService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ ConfirmationDialogComponent ]
})
export class AppModule { }
