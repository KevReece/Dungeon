import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserConsoleComponent } from './user-console/user-console.component';
import { CharacterComponent } from './character/character.component';
import { MapComponent } from './map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { MapLoaderService } from './services/map-loader.service';
import { ControllerComponent } from './controller/controller.component';
import { FactoryService } from './services/factory.service';
import { UserConsoleService } from './services/user-console.service';
import { EnemiesComponent } from './enemies/enemies.component';
import { EnemySorterService } from './services/enemy-sorter.service';
import { FightService } from './services/fight.service';
import { MenuComponent } from './menu/menu.component';
import { ConfirmationDialogComponent } from './confirmation-dialog/confirmation-dialog.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ConfirmationDialogService } from './confirmation-dialog/confirmation-dialog.service';
import { PanelBackgroundComponent } from './panel-background/panel-background.component';

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
