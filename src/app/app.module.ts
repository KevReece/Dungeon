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

@NgModule({
  declarations: [
    AppComponent,
    UserConsoleComponent,
    CharacterComponent,
    MapComponent,
    ControllerComponent,
    EnemiesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [
    MapLoaderService,
    FactoryService,
    UserConsoleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
